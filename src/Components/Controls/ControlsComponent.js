// Dependencies
// React
import React from 'react';



const ControlsComponent = ({containerProps}) => {

    const {
        pause      ,
        play       ,
        logTime    ,
        rewind1Sec ,
        skip1Sec   ,
        repeat1Sec ,
        play1Sec   ,
        test       ,
    } = containerProps;

    return (        
        <div className="controls">
            <div>
                <button onClick = { test }> test </button>
            </div>
            <div>
                <button onClick = { pause   }> pause    </button>
                <button onClick = { play    }> play     </button>
                <button onClick = { logTime }> log time </button>
            </div>
            <div>
                <button onClick = { rewind1Sec }> { `<< 1 ` } </button>
                <button onClick = { repeat1Sec }> { `< 1 >` } </button>
                <button onClick = { play1Sec   }> { `| 1 >` } </button>
                <button onClick = { skip1Sec   }> { `1 >> ` } </button>
            </div>
        </div>
    );

};



export default ControlsComponent;