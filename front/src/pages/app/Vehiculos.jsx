import { Table } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import Rsidebar from '../../components/app/Rsidebar'

function Vehiculos({user,access_token}) {
    const [vehiculos,setVehiculos]=useState(null);

    useEffect(()=>{
        function obtener_vehiculos(){
            axios.get('vehiculos',
            {headers: {
                  Authorization: `Bearer ${access_token}`,
                  Accept: "application/json",
                },
            }).then((response)=>{
                setVehiculos(response.data)
                console.log(vehiculos)
            })
        }
        obtener_vehiculos();
    },[])

    return (
        <>
        <div className="mx-auto my-12 vh-100">
            <div className="bg-gray-50 relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
            <div >
                <h1 className="border-blue-800 border-b-2 block pt-5 pb-2 font-bold text-center text-3xl text-gray-900">
                Listado de Vehiculos 
                </h1>
                <div className="flex justify-between items-center my-5 px-6">
                <Table>
                    
                </Table>
                </div>

            </div>
            </div>
        </div>

        <Rsidebar />
        </>
    )
}

export default Vehiculos