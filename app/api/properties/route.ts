import connectToDatabase from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";


export const GET = async (request: any) => {
    try {
        await  connectToDatabase();

        const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
        status:200
    });
    } catch (error){
        console.log(error)
        return new Response("Something went wrong", {
            status:500
        })
    }
}


// export const POST = async (request: any) => {
//     try {
//         await  connectToDatabase();
       

//         const sessionUser = await getSessionUser();
//         if (!sessionUser || !sessionUser.user || !sessionUser.userId) {
//             return new Response("User ID is required", {
//                 status: 401
//             });
//         }

//         const {userId} = sessionUser;

//        const formData = await request.formData();
//        const amenities = formData.getAll('amenities');
//        const images = formData.getAll('images').filter((image: any) => image.name !== '');

//        const propertyData = {
//         name: formData.get('name'),
//         type: formData.get('type'),
//         description: formData.get('description'),
//         location: {
//           street: formData.get('street'),
//           city: formData.get('city'),
//           state: formData.get('state'),
//           zipcode: formData.get('zipcode'),
//         },
//         address: formData.get('address'),
//         beds: formData.get('beds'),
//         baths: formData.get('baths'),
//         square_feet: formData.get('square_feet'),
//         amenities: amenities,
//         rates: {
//           nightly: formData.get('nightly'),
//           weekly: formData.get('weekly'),
//           monthly: formData.get('monthly'),
//         },
//         seller_info: {
//           name: formData.get('name'),
//           email: formData.get('email'),
//           phone: formData.get('phone'),
//         },
//         owner: userId,
      
//        }

       

//        // upload images to cloudinary
//        const uploadedImages = [];
//        for (const image of images) {
//          if (typeof image.arrayBuffer === "function") {
//            const imageBuffer = await image.arrayBuffer();
//            const imageArray = Array.from(new Uint8Array(imageBuffer));
//            const imageData = Buffer.from(imageArray);
//            // convert image data to base64
//            const base64Image = imageData.toString('base64');
//            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
//              folder: 'rentalproperty',
//            });
//            uploadedImages.push(result.secure_url);
//          }
//        }
//        //wait for all images to be uploaded
//        propertyData.images = uploadedImages;

//        const newProperty = new Property(propertyData);
//         await newProperty.save();
//     console.log("New Property Added:", newProperty);
//     return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
//     } catch (error){
//         console.log(error)
//         return new Response("Something went wrong", {
//             status:500
//         })
//     }
// }


export const POST = async (request: any) => {
    try {
        await connectToDatabase();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user || !sessionUser.userId) {
            return new Response("User ID is required", {
                status: 401
            });
        }

        const {userId} = sessionUser;

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter((image: any) => image.name !== '');

        // Fix: Extract nested fields correctly
        const propertyData = {
            name: formData.get('name'),
            type: formData.get('type'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities: amenities,
            rates: {
                nightly: formData.get('rates.nightly'),
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'), // Fixed: removed extra dot
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        }

        // Upload images to cloudinary
        const uploadedImages = [];
        for (const image of images) {
            if (typeof image.arrayBuffer === "function") {
                const imageBuffer = await image.arrayBuffer();
                const imageArray = Array.from(new Uint8Array(imageBuffer));
                const imageData = Buffer.from(imageArray);
                const base64Image = imageData.toString('base64');
                const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                    folder: 'rentalproperty',
                });
                uploadedImages.push(result.secure_url);
            }
        }
        
        propertyData.images = uploadedImages;

        const newProperty = new Property(propertyData);
        await newProperty.save();
        console.log("New Property Added:", newProperty);
        
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", {
            status: 500
        })
    }
}