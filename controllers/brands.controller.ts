import { getAllBrands,getBrandByid,createBrand,deleteBrand,updateBrand } from "../models/brands.model";


//controller to get list of manufactures
export const getBrands=async(req:any,res:any):Promise<void>=>{

    try{
        const brands=await getAllBrands();

        return res.status(200).json(brands);

    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: error instanceof Error ? error.message : String(error)

    })
    }
}

//controller to get a specific brand by id
export const getBrand=async(req:any,res:any)=>{
    try{
        const {id}=req.params;

        const brand=await getBrandByid(id);

        if(!brand) return res.status(404).json({error:"Brand not found"});

        //success message
        return res.status(200).json(brand);




    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error instanceof Error ?error.message:String(error)
        })
    }
}

export const addBrand=async(req:any,res:any)=>{
    try{
        const {name}=req.body;

        //Save new brand into database
        const newBrand=await createBrand(name);

        return res.status(201).json(newBrand);

}
    catch(error){
        return res.status(500).json({
            success:false,
            message:error instanceof Error ?error.message:String(error)
        })
    }
}