import React, { useEffect, useState } from "react";
import { SERVER_URL } from "./constant";
import CarForm from "./CarForm";
import DeleteComponent from "./DeleteComponent";
import EditComponent from "./EditComponent";


function Car() {

    const [cars, setCars] = useState();

    const getCars = async () => {

        console.log(SERVER_URL)
        const response = await fetch(
            SERVER_URL + '/car',
            { method: 'GET', redirect: "follow", credentials: 'include' }
        ).then((response) => response);

        if(response.redirected) {
            document.location = response.url;
        }
        const data = await response.json();
        setCars(data)
    }

    function handleClick() {
        getCars();
    }

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
        <table>
            <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
            </tr>
            {cars &&
                cars.map((car) => (
                    <tr key={car.id}>
                        <td>{car.marca}</td>
                        <td>{car.modelo}</td>
                        <td>{car.ano}</td>
                        <td><EditComponent car={car} handleClick={handleClick}/></td>
                        <td><DeleteComponent handleClick={handleClick} id={car.id}/></td>
                    </tr>
                ))}
        </table>
        <CarForm handleClick={handleClick}/>
        </>
    )

}

export default Car;