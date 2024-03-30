import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import henceforthApi from '../utils/henceforthApi';




const Graph = ({ data,totalsales,totalhours }: any) => {
    
  
 
    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <ComposedChart width={600} height={300} data={data}>
                <XAxis dataKey={totalhours}    stroke="#2f4050" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey={totalsales} fill="#28a7453d" stroke="#2f4050" />
                <Bar dataKey={totalhours} 
                barSize={50} fill="#41b15acc" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}
export default Graph;
