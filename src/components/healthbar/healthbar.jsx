import React, { useState, useEffect } from 'react';
import './healthbar.css';

const HealthBar = ({ initialHealth, maxHealth }) => {
    const [health, setHealth] = useState(initialHealth);

    useEffect(() => {
        // Ensure health stays within the valid range [0, maxHealth]
        setHealth(Math.min(maxHealth, Math.max(0, health)));
    }, [health, maxHealth, initialHealth]);

    const healthPercentage = (health / maxHealth) * 100;

    return (
        <div className="health-bar-container">
            <div className="health-bar" style={{ width: `${healthPercentage}%`, float: 'left' }}></div>
        </div>
    );
};

export default HealthBar;
