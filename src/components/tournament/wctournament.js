import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "./wctournament.css";

const MyForm = ({ TournamentData }) => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    date: '',
    teams: [],
  });

  useEffect(() => {
    fetch('/team')
      .then((response) => response.json())
      .then((data) => {
        const formattedOptions = data.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setOptions(formattedOptions);
        const preSelectedOptions = formattedOptions.filter((option) =>
            formData.teams.some(item => item.id === option.value)
        );

        setSelectedOptions(preSelectedOptions);
      })
      .catch((error) => console.error('Error fetching options:', error));
  }, [formData]);

  useEffect(() => {
    setFormData(TournamentData);
    }, [TournamentData]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);

    let formattedselectedValues = selectedValues.map((item) =>({
        id: item.value
    }))

    setFormData({
      ...formData,
      teams: formattedselectedValues,
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
    try {
        const response = await fetch('/tournament', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Include credentials for cross-origin requests
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.location.replace('/torneio');
        } else {
          console.error('POST failed:', data.message);
        }
      } catch (error) {
        console.error('Error during POST:', error.message);
      }
  };

  const handleReturn = () => {
    window.location.replace('/torneio');
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
          autocomplete="off"
        />
      </div>

      <div>
        <label>Data:</label>
        <input
          type="date"
          name="date"
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Times:</label>
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
