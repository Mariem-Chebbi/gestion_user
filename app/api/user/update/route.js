// app/api/user/update/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ message: "Non autorisé" }), { status: 401 });
  }

  const { name, lastName, birthDate, address, phone } = await request.json();

  // Valider les données reçues
  if (!name || !lastName || !birthDate || !address || !phone) {
    return new Response(JSON.stringify({ message: "Données invalides" }), { status: 400 });
  }

  // TODO: Connectez-vous à votre base de données et mettez à jour les informations utilisateur
  // Exemple avec pseudo-code :
  /*
  try {
    await database.updateUser({
      id: session.user.id,
      name,
      lastName,
      birthDate,
      address,
      phone,
    });
    return new Response(JSON.stringify({ message: "Mise à jour réussie" }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return new Response(JSON.stringify({ message: "Erreur lors de la mise à jour" }), { status: 500 });
  }
  */

  // Pour cet exemple, on renvoie simplement un succès
  return new Response(JSON.stringify({ message: "Mise à jour réussie" }), { status: 200 });
}
