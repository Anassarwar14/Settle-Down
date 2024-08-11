import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { useEffect, useState } from 'react';
import { Countries, States, Cities } from 'countries-states-cities-service';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi";

const Search = () => {

  const [countriesList, setCountriesList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filterData, setFilterData] = useState({
    sort: '',
    country: '',
    city: '',
    bedrooms: 0,
    bathrooms: 0,
    priceHightoLow: true,
    price: 50,
    type: 'sell',
    furnished: false,
    parking: false,
    offer: false,
  })
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const countries = Countries.getCountries({
      sort: {
        mode: 'asc',
        key: 'iso2',
      },
    });
    const countryOptions = countries.map(country => ({
      value: country.name,
      label: country.name,
      id: country.iso2,
    }));
    setCountriesList(countryOptions);
  }, []);


  useEffect(() => {
    console.log(filterData);
  }, [filterData])
  

  function handleCountryChange(id, selectedOption){ 
    setSelectedCountry(selectedOption);
    handleSelectChange(id, selectedOption);
    handleSelectChange("city", '');
    if(cityList) { setCityList([]);} // Reset city list when country changes
    if(selectedCity) setSelectedCity('');
    const cities = Cities.getCities({
      filters: {
        country_code: selectedOption && selectedOption.id,
      },
    })
    const cityOptions = cities.map((city) => ({
      label: city.name,
      value: city.name,
    }))
    setCityList(cityOptions);
  }
  
  function handleSelectChange (id, selectedOption) {
    setFilterData((prev) => ({
      ...prev,
      [id]: selectedOption ? selectedOption.value : '',
    }))
  }
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.06)', // Tailwind's shadow-lg equivalent
      borderRadius: '9999px', // Tailwind's rounded-full equivalent
      padding: '0.3rem 0.8rem',
      backgroundColor: state.isDisabled ? '#F3F4F6': 'white',
      '@media (max-width: 640px)': { // Media query for small screens (mobile)
      padding: '0rem 0.4rem', // Smaller padding for mobile screens
    },
    }),
    indicatorSeparator: () => ({
      display: 'none', // Removes the default separator line
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#4A5568', // Tailwind's text-gray-700 equivalent
      paddingRight: '0.3rem',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)', // Rotate the arrow when open
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#E5E7EB' : '#A0AEC0', // Focused color: Tailwind's text-gray-200, Default: text-gray-400 equivalent
      paddingRight: '1px', // Adjust padding for the clear indicator
      cursor: 'pointer',
      '&:hover': {
        color: '#E53E3E', // Tailwind's text-red-600 equivalent on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '1rem', //0.5rem Tailwind's rounded-md equivalent
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Tailwind's shadow-lg equivalent
      overflow: 'hidden',
      minWidth: 'max-content',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#F3F4F6' : 'white', // Tailwind's bg-gray-100 equivalent
      color: '#2D3748', // Tailwind's text-gray-800 equivalent
    }),
  };


  return (
    <form className='max-sm:flex max-sm:flex-col-reverse relative'>
      <section className='mt-1 sm:mt-10 flex max-w-[76rem] ml-2 sm:mx-auto gap-10'>
        <div className='flex justify-start items-center gap-4'>
          <p className='text-sm sm:text-md text-stone-500 font-medium'>Sort By:</p> 
          <Select onChange={(selectedOption) => handleSelectChange("sort", selectedOption)} className='text-sm' placeholder={"Newest"} styles={customStyles}  id='sort' options={[{value:'Newest', label:'Newest'}, {value:'Oldest', label:'Oldest'}]} />
        </div>
        <div className='flex flex-wrap gap-10 items-stretch *:text-sm max-sm:hidden '>
            <Select  
              id='country'
              onChange={(selectedOption) => handleCountryChange("country", selectedOption)}
              value={selectedCountry} 
              styles={customStyles}
              placeholder={"Any Country"} 
              options={countriesList} 
              isClearable
            />
            <CreatableSelect  
              id='city'
              onChange={(selectedOption) => {setSelectedCity(selectedOption); handleSelectChange("city", selectedOption)}}
              value={selectedCity} 
              styles={customStyles} 
              placeholder={"Any City"}
              options={cityList} 
              isDisabled={!selectedCountry}
              isClearable
            />
            <Select onChange={(selectedOption) => handleSelectChange("bedrooms", selectedOption)} placeholder={"All Beds"} styles={customStyles} id='bedrooms' options={[{value:'1', label:'1 Room'}, {value:'2', label:'2 Room'}, {value:'3', label:'3 Room'}, {value:'4', label:'4 Room'}, {value:'5', label:'5 Room'}]} />
            <Select onChange={(selectedOption) => handleSelectChange("bathrooms", selectedOption)} placeholder={"All Baths"} styles={customStyles} id='bathrooms' options={[{value:'1', label:'1 Room'}, {value:'2', label:'2 Room'}, {value:'3', label:'3 Room'}, {value:'4', label:'4 Room'}, {value:'5', label:'5 Room'}]} />
        </div>
        <button type='submit' className='max-sm:hidden transition ease-in duration-150 bg-teal-500 text-white rounded-full px-8 shadow-sm'>
          Save Search
        </button>
      </section>
      
      <section className='mt-2 sm:mt-6 flex max-w-[70rem] sm:ml-14 items-center justify-between border px-2 sm:pl-2 sm:pr-5 sm:py-1 py-3 rounded-full bg-stone-50'>
        <div className='flex gap-2 *:border *:border-teal-500 *:max-sm:w-12 *:rounded-full *:px-1 *:py-1 *:sm:px-7 *:sm:py-[0.6rem] max-sm:text-lg sm:text-md'>
          <button type='button' onClick={() => setFilterData(prev => ({...prev, type: 'sell'}) ) } className={` text-teal-800 ${filterData.type === 'sell' ? 'bg-teal-500 text-white': 'bg-zinc-50 hover:bg-teal-100'}`}>Buy</button>
          <button type='button' onClick={() => setFilterData(prev => ({...prev, type: 'rent'}) ) } className={`  text-teal-800 ${filterData.type === 'rent' ? 'bg-teal-500 text-white': 'bg-zinc-50 hover:bg-teal-100' } `}>Rent</button>
        </div>
        <h1 className='text-2xl text-teal-700 opacity-75 font-light ml-4 sm:ml-28'>Results</h1>
        <div className='flex sm:gap-[6.4rem] mr-2 sm:mr-8 max-sm:gap-4'>
            <button type='button' className='flex max-sm:flex-row-reverse max-sm:font-light items-center gap-2 text-stone-700 hover:bg-cyan-50 transition ease-in-out duration-200' onClick={() => setFilterData((prev) => ({...prev, priceHightoLow: !prev.priceHightoLow}))}>
              {filterData.priceHightoLow ? 
                <HiOutlineSortDescending className='text-teal-600 w-5 h-5 sm:w-4 sm:h-4 border border-teal-400 rounded'/>
                : <HiOutlineSortAscending className='text-teal-600 w-5 h-5 sm:w-4 sm:h-4 border border-teal-400 rounded'/> 
              }
              <p className='text-sm'>Price</p>
            </button>
            <button type='button' onClick={() => setIsOpen(true)} className='flex gap-2 text-stone-700 items-center hover:bg-cyan-50 transition ease-in-out duration-200'>
              <TbAdjustmentsHorizontal className='text-teal-600 sm:w-4 sm:h-4 w-5 h-5 border border-teal-400 rounded '/>
              <p className='text-sm max-sm:hidden'>More Filter</p>
            </button>
        </div>
      </section>

      <section
        className={`z-[99] fixed top-0 right-0 h-full bg-slate-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0 shadow-[-2px_0px_30px_10px_rgba(0,0,0,0.3)]' : 'translate-x-full'
        } w-[21rem] md:w-80 lg:w-96`} 
      >
        <div className="p-4 sm:pb-20 flex flex-col justify-between h-screen">
          <div className="mt-4">
            <h2 className="text-2xl text-slate-700 text-center font-semibold mb-4">Filters</h2>
            <div className='grid grid-cols-2 text-sm gap-2 sm:hidden'>
              <Select  
                id='country'
                onChange={(selectedOption) => handleCountryChange("country", selectedOption)}
                value={selectedCountry} 
                styles={customStyles}
                placeholder={"Any Country"} 
                options={countriesList} 
                isClearable
              />
              <CreatableSelect  
                id='city'
                onChange={(selectedOption) => {setSelectedCity(selectedOption); handleSelectChange("city", selectedOption)}}
                value={selectedCity} 
                styles={customStyles} 
                placeholder={"Any City"}
                options={cityList} 
                isDisabled={!selectedCountry}
                isClearable
              />
              <Select onChange={(selectedOption) => handleSelectChange("bedrooms", selectedOption)} placeholder={"Beds"} styles={customStyles} id='bedrooms' options={[{value:'1', label:'1 Room'}, {value:'2', label:'2 Room'}, {value:'3', label:'3 Room'}, {value:'4', label:'4 Room'}, {value:'5', label:'5 Room'}]} />
              <Select onChange={(selectedOption) => handleSelectChange("bathrooms", selectedOption)} placeholder={"Baths"} styles={customStyles} id='bathrooms' options={[{value:'1', label:'1 Room'}, {value:'2', label:'2 Room'}, {value:'3', label:'3 Room'}, {value:'4', label:'4 Room'}, {value:'5', label:'5 Room'}]} />
            </div>
            <div className="relative mb-6 mt-3">
              <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
              <input id="labels-range-input" value={filterData.price} onChange={(e) => setFilterData((prev) => ({...prev, price: +e.target.value }))} type="range"  min="50" max="1000000000" className="w-full h-2 bg-gray-200 rounded-lg focus:outline-none border-none accent-teal-600 cursor-pointer " />
              <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min $50</span>
              <input value={filterData.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} onClick={() => setFilterData((prev) => ({...prev, price: +0}))} onChange={(e) => setFilterData((prev) => ({...prev, price: Number(e.target.value.replace(/\.00/, '').replace(/[^0-9]/g, ''))})) }  className="text-xs text-center text-gray-700 absolute start-1/3 w-24 -bottom-6 bg-white rounded-md border focus:outline-none"/>
              <span className="text-xs text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">$1B Max</span>
            </div>
            <div className='flex flex-wrap items-center mt-10 gap-2 ml-2 text-slate-800 accent-teal-600 text-sm'>
              <input id='furnished' onChange={(e) => setFilterData(prev => ({...prev, furnished: e.target.checked}) ) } type="checkbox" />
              <label htmlFor="furnished">Furnished</label>
              <input  id='parking' onChange={(e) => setFilterData(prev => ({...prev, parking: e.target.checked}))} className='ml-14' type="checkbox" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className='flex flex-wrap items-center gap-2 ml-2 text-slate-800 accent-teal-600 text-sm'>
              <input onChange={(e) => setFilterData(prev => ({...prev, offer: e.target.checked}))} id='offer' type="checkbox" />
              <label htmlFor="offer">Discount</label>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <button type='submit' className=' transition ease-in duration-150 bg-teal-500 text-white rounded-full px-6 py-1  shadow-sm'>
              Save 
            </button>
            <button
              type='button'
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none mt-2"
            >
              Close
            </button>
          </div>
        </div>
      </section>

      {/* Overlay to darken the background when the sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </form>
  )
}

export default Search