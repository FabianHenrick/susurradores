"use server";

import { prisma } from "@/lib/prisma";
// Certifique-se de que este caminho está correto conforme a resposta anterior
import { createClient } from "@/lib/supabase/server"; 
import { revalidatePath } from "next/cache";

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Verifica se o usuário é admin via metadata
  if (user?.user_metadata?.role !== "admin") {
    throw new Error("Acesso negado. Apenas comandantes podem alterar o arsenal.");
  }
}

export async function createProduct(formData: FormData) {
  await checkAdmin();

  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;
  const stock = parseInt(formData.get("stock") as string);

  await prisma.product.create({
    data: { name, price, category, image, description, stock },
  });

  revalidatePath("/shop");
}

export async function updateProduct(id: string, formData: FormData) {
  await checkAdmin();

  const data = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    category: formData.get("category") as string,
    image: formData.get("image") as string,
    description: formData.get("description") as string,
    stock: parseInt(formData.get("stock") as string),
  };

  await prisma.product.update({ where: { id }, data });

  revalidatePath("/shop");
  revalidatePath(`/shop/${id}`);
}

export async function deleteProduct(id: string) {
  await checkAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/shop");
}