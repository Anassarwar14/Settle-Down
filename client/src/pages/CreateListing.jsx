import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {
  CountrySelect,
  CitySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { BsCurrencyDollar, BsHouseAdd, BsHouseUp, BsHouseCheck, BsHouseExclamation } from "react-icons/bs";
import { HiOutlineArrowLeft} from "react-icons/hi2";
import { RiImageAddLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdError, MdUpload } from 'react-icons/md';

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [isOffer, setIsOffer] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [formData, setFormData] = useState({
    imageURLs:[],
    name:'',
    description:'',
    address:'',
    city:'',
    state:'',
    country:'',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    furnished: false,
    parking: false,
    type: 'sell',
    offer: false,
    userRef: '',
  });
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]) 
  const [showButton, setShowButton] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    console.log(formData);
    if(files.length > 0) {
       setShowButton(true);
    }
    else{ 
       setShowButton(false);
    }

  }, [formData, files])

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      if (formData.imageURLs.length < 1) return setError('Atleast 1 image must be uploaded!');
      if (+formData.regularPrice <= +formData.discountPrice && formData.offer) return setError('Discount Price should be less than Regular Price!');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create-listing', 
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        })
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate(`/listing/${data._id}`), 1000); 
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  
  function handleImageSubmit (e) {
    if(files.length > 0 && files.length + formData.imageURLs.length < 7){
      setUploading(true);
      setImageUploadError(false);
      
      const promises = [];
      for (let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData((prevState) => {
          return {...prevState, imageURLs: prevState.imageURLs.concat(urls)}; 
        });
        setImageUploadError(false);
        setFiles([]);
        setUploading(false);
        setError(false);

      }).catch((err) => {
        setUploading(false);
        setImageUploadError('Upload failed! (Max-size per image: 2 MB)');
      });
    }
    else {
      setUploading(false);
      setImageUploadError('Max images Allowed: 6');
    }
  }

  async function storeImage (image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed", 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      )

    })
  }

  function handleImageRemove (index) {
    setFormData((prev) => {
      return {...prev, imageURLs: formData.imageURLs.filter((url, i) => i !== index)}
    })
    setFileNames(fileNames.filter((_, i) => i !== index));
  }

  function handleChange (e) {

    if (error) setError(false);//dispatch(resetError());
    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setFormData((prevState) => {
        return {...prevState, [e.target.id]:e.target.checked}; 
      });
      return;
    }

    if(e.target.id === 'bedrooms' || e.target.id === 'bathrooms'){
      setFormData((prevState) => {
        return {...prevState, [e.target.id]: Number(e.target.value)}; 
      });
      return;
    }

    setFormData((prevState) => {
      return {...prevState, [e.target.id]:e.target.value}; 
    });

  }

  function handleLocChange (id, name) {
    setFormData((prevState) => {
      return {...prevState, [id]:name}; 
    });
    setError(false);
  }

  function toggleRent (e) {
    setIsRent(!isRent);
  }

  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  return (
    <main className='sm:py-5 sm:px-10 mx-auto'>
      <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-5 sm:gap-6 '>
        <section className='flex flex-col gap-4 col-span-1 sm:col-span-3 bg-gray-100 border rounded-md p-4 '>
          <div className="flex items-center justify-between">
            <h2 className='mb-2 text-xl font-medium text-zinc-700 flex items-center gap-1'>
              <Link to={'/profile'}><HiOutlineArrowLeft className='hover:bg-slate-200 rounded-xl text-2xl p-1'/></Link>
              Property Details
            </h2>
            <button disabled={error || loading || uploading} type='submit' className={`p-3 w-44 enabled:bg-teal-500 rounded-xl shadow-md enabled:hover:ring-4 enabled:hover:ring-cyan-200 transition-all ease-in-out duration-300 text-white flex items-center justify-center gap-3 font-light ${error ? 'disabled:bg-red-500' :  'disabled:bg-gray-300'} disabled:cursor-not-allowed`}>
              {(loading) ? <><BsHouseUp className='text-xl animate-pulse' /> Publishing...</> : (!error && !success) ? <><BsHouseAdd className='text-xl'/> Publish Property</> : 
              error ? <><BsHouseExclamation className='text-xl' /> Publish Error</> :
              success && <><BsHouseCheck className='text-xl' /> Published</>}
            </button>
          </div>
          <h3 className='text-lg text-zinc-900 font-medium'>Property Information</h3>
          {error && <span className='text-sm text-red-600 flex items-center gap-1'><MdError /><p>{error}</p></span>}
          <label htmlFor="name">Property Name</label>
          <input required onChange={handleChange} id="name" maxLength={100} className='w-full text-zinc-700 rounded-md border shadow-sm p-2 bg-gray-50 focus:outline-none' />
          <article className='grid grid-cols-2 gap-4'>
            <label>Country</label>
            <label>State</label>
            <CountrySelect
              required
              id="country"
              onChange={(e) => {
                setCountryid(e.id);
                handleLocChange("country", e.name);
              }}
              placeHolder="Select Country"
              inputClassName='bg-gray-50 border-noneImp focus:outline-none text-zinc-700'
              containerClassName='bg-gray-50 *:border-0 border rounded-md shadow-sm'
              />
            <StateSelect
              id="state"
              countryid={countryid}
              onChange={(e) => {
                setStateid(e.id);
                handleLocChange("state", e.name);
              }}
              onTextChange={(e) => handleLocChange("state", e.target.value)}
              placeHolder={formData.state || "Select State"}
              inputClassName='bg-gray-50 font-[Outfit] border-noneImp focus:outline-none text-zinc-700'
              containerClassName='bg-gray-50 *:border-0 border rounded-md shadow-sm'
              />
              <label className='col-span-2'>City</label>
            <CitySelect
              id="city"
              countryid={countryid}
              stateid={stateid}
              onChange={(e) => {
                setCityid(e.id);
                handleLocChange("city", e.name);
              }}
              onTextChange={(e) => handleLocChange("city", e.target.value)}
              placeHolder={formData.city || "Select City"}
              inputClassName='font-[Outfit] bg-gray-50 border-noneImp focus:outline-none text-zinc-700'
              containerClassName='bg-gray-50 *:border-0 border rounded-md shadow-sm'
            />
          </article>
          <label htmlFor='address' className='text-md text-zinc-900'>Address</label>
          <input required onChange={handleChange} id='address' type='address'  className='w-full rounded-md border shadow-sm p-2 bg-gray-50 focus:outline-none text-zinc-700' />
          
          <h3 className='text-lg text-zinc-900 font-medium'>Property Specification</h3>
          <article className='grid grid-cols-2 gap-2 gap-x-4'>
            <label htmlFor='bedrooms' >Bedrooms</label>
            <label htmlFor='bathrooms' >Bathrooms</label>
            <select onChange={handleChange} id='bedrooms' className='bg-gray-50 border rounded-md shadow-sm p-2 text-zinc-700'>
              <option value={1} >1 Room</option>
              <option value={2} >2 Room</option>
              <option value={3} >3 Room</option>
              <option value={4} >4 Room</option>
              <option value={5} >5 Room</option>
            </select>
            <select onChange={handleChange} id='bathrooms' className='bg-gray-50 border rounded-md shadow-sm p-2 text-zinc-700'>              
              <option value={1} >1 Room</option>
              <option value={2} >2 Room</option>
              <option value={3} >3 Room</option>
              <option value={4} >4 Room</option>
              <option value={5} >5 Room</option>
            </select>
            <h3 className='col-span-2'>Benefits</h3>
            <div>
              <div className="flex items-center gap-2">
                <input value={formData.parking} onChange={handleChange} id='parking' type='checkbox' className='text-xs accent-teal-600 rounded'/>
                <label htmlFor='parking' className='text-sm'>Parking</label>
              </div>
              <div className="flex items-center gap-2">
                <input value={formData.furnished} onChange={handleChange} id='furnished' type='checkbox' className='text-xs accent-teal-600 rounded'/>
                <label htmlFor='furnished' className='text-sm'>Furnished</label>
              </div>
            </div>
          </article>

          <h3 className='text-lg text-zinc-900 font-medium'>Property Pricings</h3>
          <article onChange={(e) => {toggleRent(); handleChange(e);}} >
            <div className="flex items-center gap-2">
              <input required  id='type' value="rent" name='radio' type='radio' className='text-xs accent-teal-600 rounded '/>
              <label htmlFor='type' className='text-sm'>Rent</label>
            </div>
            <div className="flex items-center gap-2">
              <input required defaultChecked value="sell" id='type' name='radio' type='radio' className='text-xs accent-teal-600 rounded'/>
              <label htmlFor='type' className='text-sm'>Sell</label>
            </div>
          </article>
          <div className="flex items-center gap-2">
            <input value={formData.offer} onChange={ (e) => {handleChange(e); setIsOffer(!isOffer);}} id='offer' type='checkbox' className='text-xs accent-teal-600 rounded'/>
            <label htmlFor="offer" className='text-sm'>Discount Offer</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="regularPrice" className={`${!isOffer && 'col-span-2'}`}>{isRent ? "Monthly Payment" : "Regular Price"}</label>
            <label hidden={!isOffer} htmlFor="discountPrice">Discounted Price</label>
            <div className="flex items-center justify-around bg-gray-50 border rounded-md p-2 shadow-sm text-zinc-700">
              <input required value={formData.regularPrice} onChange={handleChange} id='regularPrice' type='number' min={50} max={100000000000}  className='bg-gray-50 border rounded-md w-4/5 focus:outline-none'/>
              <BsCurrencyDollar className='text-teal-500'/>{isRent && <small>/ month</small>}
            </div>
            <div className={`flex items-center justify-around bg-gray-50 border rounded-md p-2 shadow-sm text-zinc-700 ${!isOffer && 'hidden'}`}>
              <input value={formData.discountPrice} onChange={handleChange} id='discountPrice' type='number' min={0} max={100000000000-1} className='bg-gray-50 border rounded-md w-4/5 focus:outline-none'/>
              <BsCurrencyDollar className='text-teal-500'/> {isRent && <small>/ month</small>}
            </div>
          </div>
        </section>

        <aside className='h-max bg-gray-100 border rounded-md p-5 col-span-2'>
          <section className='flex flex-col gap-6'>
            <h2 className='text-xl font-medium text-zinc-700'>Property Image</h2>
            <div className="grid grid-cols-3 gap-3 *:rounded-md *:shadow-md">
              <img className='col-span-3 hover:opacity-90 w-full h-[19rem] object-cover smooth_rendering' src={formData.imageURLs[0] || 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}></img>
              <img className='hover:opacity-90 w-full h-24 object-cover smooth_rendering' src={formData.imageURLs[1] || 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} ></img>
              <img className='hover:opacity-90 w-full h-24 object-cover smooth_rendering' src={formData.imageURLs[2] || 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} ></img>
              <input  
                id='images'
                onChange={(e) => { 
                  setFiles(e.target.files); 
                  Array.from(e.target.files).map(file => setFileNames((prev) => [...prev, file.name]));
                  setImageUploadError(false);
                }}
                type='file'
                ref={fileRef}
                hidden
                accept='image/*'
                multiple
              />
              <button type='button' onClick={() => fileRef.current.click()} className='w-full bg-gray-100 hover:bg-gray-50 border-2 border-dashed border-teal-600 border-opacity-70 flex flex-col items-center justify-center text-teal-700 opacity-75'>
                <RiImageAddLine className='w-5 h-5'/><p className='text-xs'>Add Images</p>
                {files.length > 0  && <span className='text-teal-600 text-xs flex items-center gap-1'><FaCheck />{files.length} Selected</span>}
              </button>
            </div>
              {
                formData.imageURLs.length > 0 && 
                <div className='flex flex-col gap-2'> 
                  {formData.imageURLs.map((url, index) => 
                    (
                      <div key={url} className='w-44 flex items-center justify-between text-xs text-zinc-700'>
                        <img className='w-12 h-8 object-cover smooth_rendering rounded-lg' src={url} alt='listing img' />
                        {fileNames[index] && <h4 className='text-ellipsis overflow-hidden w-20 whitespace-nowrap'>{fileNames[index]}</h4>}
                        <button type='button' onClick={() => handleImageRemove(index)} className='hover:bg-red-400 hover:text-red-600 hover:bg-opacity-50 rounded-full p-[0.1rem]'><RxCross2/></button>
                      </div>
                    ))}
                </div>
              }
              {imageUploadError && <span className='text-xs text-red-600 flex items-center gap-1'><MdError />{imageUploadError}</span>}
            <button type='button' disabled={uploading} hidden={!showButton} onClick={handleImageSubmit} className='text-sm enabled:hover:bg-emerald-100 border border-emerald-600 border-opacity-20 hover:opacity-70 shadow-teal-600 text-teal-600 p-1 rounded-2xl disabled:animate-pulse'>{uploading ? 'Uploading...' : 'Upload'}</button>
            <h2 className='text-lg text-zinc-900 font-medium'>Property Description</h2>
            <textarea required value={formData.description} onChange={handleChange} name="description" id="description" placeholder='Highlight the main selling points...' className='caret-teal-500 focus:outline-teal-500 min-h-36 border shadow-sm rounded-lg bg-gray-50 p-3 text-zinc-700'></textarea>
          </section>
          <button type='button' onClick={scrollToTop} className='w-full mt-4 rounded-full text-fuchsia-800 border border-purple-400 hover:bg-purple-400 transition ease-in-out duration-300 flex items-center justify-center gap-2 p-2'><MdUpload className='text-fuchsia-700'/>Next</button>
        </aside>
      </form>
    </main>
  )
}

export default CreateListing