const router=require("express").Router();
const data=require("../data");
const restaurantsData=data.restaurants;
const xss=require("xss");

// router.get("/", async (req,res)=>{
//     try{
//         const theRestaurants=await restaurantsData.getAllRestaurants();
//         res.render('./restaurants/restaurants', {
//             theRestaurants:theRestaurants
//         });   
//     }catch(e){
//         console.log(e);
//         res.redirect('./restaurants/restaurants');
//     }   
// });
router.get("/", async (req,res)=>{
    try{
        const theRestaurants=await restaurantsData.getSix();
        res.render('./restaurants/restaurants', {
            theRestaurants:theRestaurants
        });   
    }catch(e){
        console.log(e);
        res.redirect('./restaurants/restaurants');
    }   
});
router.get("/all", async (req,res)=>{
    try{
        const all=await restaurantsData.getAllRestaurants();
        res.render('./restaurants/all', {
            all:all
        });
    }catch(e){
        res.redirect('./restaurants/restaurants');
    }   
});

router.get("/:id", async (req,res)=>{
    try{
        const restaurant=await restaurantsData.getRestaurantById(req.params.id);
        res.render('./restaurants/:id', {
            restaurant:restaurant
        });
    }catch(e){
        console.log(e);
        res.status(404).json({error:"The restaurant not found."});
    }
});

router.get("/restaurantsAndReviews", async (req,res)=>{
    try{
        const getData=await restaurantsData.getRestaurantsAndReviews();
        res.json(getData);
    }catch(e){
        console.log(e);
        res.status(404).json({error:"The restaurant not found."});
    }
});

router.get("/:name", async (req,res)=>{
    try{
        const getData=await restaurantsData.getRestaurantByName(req.params.name);
        res.json(getData);
    }catch(e){
        console.log(e);
        res.status(404).json({error:"The restaurant not found."});
    }
});

router.post("/", async (req,res)=>{
    let restaurantInfo=req.body; 
    if (!restaurantInfo) {
        res.status(400).json({ error: "You must provide data to create a restaurant." });
        return;
    }
    if (!restaurantInfo.R_cuisine) {
        res.status(400).json({ error: "You must provide a cuisine." }); 
        return;
    }
    if (!restaurantInfo.R_name) {
        res.status(400).json({ error: "You must provide name." });
        return;
    }
    if (!restaurantInfo.R_href) {
        res.status(400).json({ error: "You must provide href." });
        return;
    }
    if (!restaurantInfo.R_location) {
        res.status(400).json({ error: "You must provide location." });
        return;
    }
    try{
        const newRestaurant=await restaurantsData.addRestaurant(restaurantInfo.R_cuisine,restaurantInfo.R_name,restaurantInfo.R_href,restaurantInfo.R_location);
        res.json(newRestaurant);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    } 
});

module.exports=router;