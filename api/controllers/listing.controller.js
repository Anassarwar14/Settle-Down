import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";


export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing); 
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, 'Listing not found!'));
    if(req.user.id !== listing.userRef) return next(401, 'You can only delete your own listing!');
    
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!')
    } catch (error) {
        next(error);
    }
}


export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404, 'Listing not found!'));
    if(req.user.id !== listing.userRef) return next(401, 'You can only delete your own listing!');
    
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, 
            req.body, 
        {new: true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    
    try {    
        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(404, 'Listing not found!'));
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}


export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 12;
        const startIndex = parseInt(req.query.startIndex) || 0;
        
        let offer = req.query.offer;
        if (offer === undefined || offer === false){
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === false) {
            furnished = { $in:[false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === false) {
            parking = { $in:[false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in:['sell', 'rent'] };
        }

        let country = req.query.country;
        if (country === undefined || country === '') {
            country = { $exists:true };
        }

        let city = req.query.city;
        if (city === undefined || city === '') {
            city = { $exists:true };
        }

        let bedrooms = parseInt(req.query.bedrooms);
        if (isNaN(bedrooms)) {
            bedrooms = { $in:[1, 2, 3, 4, 5] };
        }
        let bathrooms = parseInt(req.query.bathrooms);
        if (isNaN(bathrooms)) {
            bathrooms = { $in:[1, 2, 3, 4, 5] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'desc';
        const order = req.query.order || 'desc';
        const maxPrice = parseInt(req.query.price) || Infinity;
        const listings = await Listing.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { city: { $regex: searchTerm, $options: 'i' } },
                { state: { $regex: searchTerm, $options: 'i' } },
                { country: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ],
            city,
            country,
            offer,
            furnished,
            parking,
            bedrooms,
            bathrooms,
            type,
            regularPrice:  { $lte: maxPrice }
        })
        .sort(
            {
                'regularPrice': order,
                'createdAt': sort,
            }
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
     next(error);   
    }
}