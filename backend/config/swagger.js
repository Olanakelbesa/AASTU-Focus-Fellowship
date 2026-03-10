import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const normalizeSwaggerPath = (basePath, routePath) => {
  const toStringPath = (value) => {
    if (Array.isArray(value)) {
      return value[0] || "";
    }
    return typeof value === "string" ? value : "";
  };

  const raw = `${toStringPath(basePath)}${toStringPath(routePath)}`;
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/$/, "") || "/";

  // Express params use :id while OpenAPI expects {id}.
  return withoutTrailingSlash.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
};

const buildPathsFromRouters = (routeDefinitions = []) => {
  const paths = {};

  for (const routeDef of routeDefinitions) {
    const { basePath = "", router, tag = "API" } = routeDef;

    if (!router || !Array.isArray(router.stack)) {
      continue;
    }

    for (const layer of router.stack) {
      if (!layer.route || !layer.route.path || !layer.route.methods) {
        continue;
      }

      const fullPath = normalizeSwaggerPath(basePath, layer.route.path);
      const methods = Object.keys(layer.route.methods).filter(
        (method) => layer.route.methods[method],
      );

      if (!paths[fullPath]) {
        paths[fullPath] = {};
      }

      for (const method of methods) {
        const lowerMethod = method.toLowerCase();
        paths[fullPath][lowerMethod] = {
          tags: [tag],
          summary: `${method.toUpperCase()} ${fullPath}`,
          responses: {
            200: { description: "Successful response" },
            400: { description: "Bad request" },
            401: { description: "Unauthorized" },
            500: { description: "Server error" },
          },
        };
      }
    }
  }

  return paths;
};

const createSwaggerSpec = (routeDefinitions = []) => {
  const generatedPaths = buildPathsFromRouters(routeDefinitions);

  const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "AASTU Focus Fellowship API",
        version: "1.0.0",
        description:
          "API documentation for the AASTU Focus Fellowship backend.",
      },
      servers: [
        {
          url: "http://localhost:5002",
          description: "Local development server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: [
      path.resolve(process.cwd(), "app.js"),
      path.resolve(process.cwd(), "routes/*.js"),
    ],
  };

  const jsdocSpec = swaggerJsdoc(options);

  return {
    ...jsdocSpec,
    paths: {
      ...generatedPaths,
      ...(jsdocSpec.paths || {}),
    },
  };
};

const setupSwagger = (app, routeDefinitions = []) => {
  const swaggerSpec = createSwaggerSpec(routeDefinitions);

  app.use("/api-docs", (req, res, next) => {
    // Swagger UI injects inline script/style, so relax CSP only for docs.
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'",
    );
    next();
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default setupSwagger;
