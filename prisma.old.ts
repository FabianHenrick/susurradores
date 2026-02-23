import { defineConfig } from "@prisma/config";
import "dotenv/config"; // Isso garante que o .env seja lido no WSL

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});