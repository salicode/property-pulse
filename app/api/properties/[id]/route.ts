import connectToDatabase from "@/config/database";
import Property from "@/models/Property";

// export const GET = async (request: Request, { params }: { params: { id: string } }) => {
//     try {
//         await  connectToDatabase();

//         const property = await Property.findById(params.id);
//          if(!property){
//             return new Response("Property Not Found", {
//                 status:404
//             })
//         }
//     return new Response(JSON.stringify(property), {
//         status:200
//     });
//     } catch (error){
//         console.log(error)
//         return new Response("Something went wrong", {
//             status:500
//         })
//     }
// }


export const GET = async (
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDatabase();

    // Await the params object
    const { id } = await params;
    
    const property = await Property.findById(id);
    
    if (!property) {
      return new Response("Property Not Found", {
        status: 404
      });
    }
    
    return new Response(JSON.stringify(property), {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500
    });
  }
};