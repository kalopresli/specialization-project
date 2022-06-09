import React from 'react';
import zxcvbn from 'zxcvbn';

const passwordStrengthMeter = ({ password }) => {
    const testResult = zxcvbn(password);
    const num = testResult.score * 100 / 4;

    const createPassLabel = () => {
        switch (testResult.score) {
            case 0:
                return 'Very weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'none';
        }
    }

    const funcProgresscolor = () => {
        switch (testResult.score) {
            case 0:
                return '#828282';
            case 1:
                return '#EA1111';
            case 2:
                return '#FFAD00';
            case 3:
                return '#9bc1158';
            case 4:
                return '#00b500';
            default:
                return 'none';
        }
    }

    console.log(num);

    const changePasswordColor = () => ({
        width: `${num}%`,
        background: funcProgresscolor(),
        heigth: '7px'
    })

    return (
        <>
            <div className="progress" style={{ height: '7px' }}>
                <div className='progress-bar' style={changePasswordColor()}></div>
            </div>
            <p style={{
                color: funcProgresscolor()
            }}>{createPassLabel()}</p>
        </>

    )
}

export default passwordStrengthMeter