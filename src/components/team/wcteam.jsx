import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const MyForm = ({ TeamData }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    user: 0,
    pokemons: [],
  });

  useEffect(() => {
    fetch('/pokemon')
      .then((response) => response.json())
      .then((data) => {
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setOptions(formattedOptions);
        const preSelectedOptions = formattedOptions.filter((option) =>
            formData.pokemons.some(item => item.id === option.value)
        );

        setSelectedOptions(preSelectedOptions);
      })
      .catch((error) => console.error('Error fetching options:', error));
  }, [formData]);

  useEffect(() => {
    setFormData(TeamData);
    }, [TeamData]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);

    let formattedselectedValues = selectedValues.map((item) =>({
        id: item.value
    }))

    setFormData({
      ...formData,
      pokemons: formattedselectedValues,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.user){
      try {
        const response = await fetch('/user_info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          formData.user = data.userid
        }
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
    }

    try {
        const response = await fetch('/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Include credentials for cross-origin requests
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.location.replace('/team');
        } else {
          console.error('POST failed:', data.message);
        }
      } catch (error) {
        console.error('Error during POST:', error.message);
      }
  };

  const handleReturn = () => {
    window.location.replace('/team');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>

      <div>
        <label>Pokemons:</label>
        <Select
          isMulti
          options={options}
          onChange={handleChange}
          value={selectedOptions}
        />
      </div>

      <div className='BotaoLinha'>
        <button type="button" className='BotaoFechar' onClick={handleReturn}>Fechar</button>
        <button type="submit">Confimar</button>
      </div>
    </form>
  );
};

export default MyForm;
