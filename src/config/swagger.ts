import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.2",
        tags: [{
            name: "Products",
            description: "API operations related to products"
        }],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

export const swaggerUIOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url("https://brandemia.org/contenido/subidas/2014/03/principal.jpg");
            height: 120px;
            width: auto;
        }
    `,
    customSiteTitle: "NAZHEEEEEEEEEEEEE"
}
export default swaggerSpec
