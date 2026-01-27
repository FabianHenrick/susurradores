import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// Carrega as variáveis do arquivo .env
dotenv.config();

export default defineConfig({
  datasource: {
    // Agora o process.env terá o valor correto
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});
