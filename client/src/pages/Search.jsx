import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Countries, States, Cities } from 'countries-states-cities-service';
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const Search = () => {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const [countryid, setCountryid] = useState(0);
  const [countriesList, setCountriesList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);

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


  function handleCountryChange(selectedOption){ 
    setSelectedCountry(selectedOption);
    if(cityList) setCityList([]); // Reset city list when country changes
    if(selectedCity) setSelectedCity(null);
    const cities = Cities.getCities({
      filters: {
        country_code: selectedOption.id,
      },
    })
    const cityOptions = cities.map((city) => ({
      label: city.name,
      value: city.name,
    }))
    setCityList(cityOptions);
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.08), 0 10px 20px rgba(0, 0, 0, 0.06)', // Tailwind's shadow-lg equivalent
      borderRadius: '9999px', // Tailwind's rounded-full equivalent
      padding: '0.3rem 0.8rem',
      backgroundColor: state.isDisabled ? '#F3F4F6': 'white',
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
      width: 'max-content'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#F3F4F6' : 'white', // Tailwind's bg-gray-100 equivalent
      color: '#2D3748', // Tailwind's text-gray-800 equivalent
    }),
  };



  return (
    <form className='mt-10 flex max-w-[76rem] mx-auto gap-10'>
      <div className='flex items-center gap-4'>
        <p className='text-md max-sm:hidden text-stone-500 font-medium'>Sort By:</p> 
        <Select className='text-sm' placeholder={"Newest"} styles={customStyles}  id='sort' options={[{value:'Newest', label:'Newest'}, {value:'Oldest', label:'Oldest'}]} />
      </div>
      <div className='flex flex-wrap gap-10 items-stretch *:text-sm'>
          <Select  
            id='country'
            onChange={handleCountryChange}
            value={selectedCountry} 
            styles={customStyles}
            placeholder={"Any Country"} 
            options={countriesList} 
            isClearable
          />
          <Select  
            id='type'
            onChange={(selectedOption) => setSelectedCity(selectedOption)}
            value={selectedCity} 
            styles={customStyles} 
            placeholder={"Any City"}
            options={cityList} 
            isDisabled={!selectedCountry}
            isClearable
          />
          <Select styles={customStyles} id='price' options={[{value:'Newest', label:'Newest'}, {value:'oldest', label:'oldest'}]} />

          <Select styles={customStyles} id='' options={[{value:'Newest', label:'Newest'}, {value:'oldest', label:'oldest'}]} />
      </div>
      <section>
          <div class="relative group inline-block place-self-center">
            <button>
              <TbAdjustmentsHorizontal className='text-teal-600 w-5 h-5 border border-teal-400 rounded-md'/>
            </button>
            <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-16 mt-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg  z-10">
                <p className="px-4 py-2">More Filter</p>
            </div>
          </div>
          <button type='submit' className='transition ease-in duration-150 bg-teal-500 text-white rounded-full px-8 shadow-sm'>
            Save Search
          </button>
      </section>
    </form>
  )
}

export default Search