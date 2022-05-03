import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";


import './style.css';

const Card = ({pokemon, loading}) => {
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pokeName, setPokeName] = useState('');
    const [pokeHeight, setPokeHeight] = useState('');
    const [pokeWeight, setPokeWeight] = useState('');
    const [pokeImg, setPokeImg] = useState();
    const [searchInput, setSearchInput] = useState('');

    const openPokeInfo = async(res) => {
        setPokeName(res.name);
        setPokeHeight(res.height);
        setPokeWeight(res.weight);
        setPokeImg(res.sprites.front_default);
        handleShow();

    }


    return(
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{pokeName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="poke-content">
                    <img src={pokeImg} class="img-fluid img-height" alt="Responsive image"></img>
                    <p>
                        Height : {pokeHeight}
                    </p>

                    <p>
                        Weight : {pokeWeight}
                    </p>
                    
                </Modal.Body>
            </Modal>

            <div class="form-group has-search">
                <span class="fa fa-search form-control-feedback">
                    <RiSearch2Line className="search-icon" />
                </span>
                <input type="text" class="form-control"
                onChange={event => {setSearchInput(event.target.value)}}
                placeholder="Search" />
            </div>

            <div className="row card-row">
                

                {
                    loading ? <h1>Loading...</h1> :
                    pokemon.filter((item) => {
                        if (searchInput == "") {
                            return item
                        } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())){
                            return item
                        }
                    }).map((item) => {
                        return (
                            // <div className="row">
                                
                                <div className="col-md-3">
                                    <div className="card poke-card" key={item.id} onClick={()=> openPokeInfo(item)}>
                                        {/* <p className="card-id">{item.id}</p> */}
                                        <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card image cap"></img>
                                        <div className="card-body">
                                            <h5 className="card-title poke-name">{item.name}</h5>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            // </div>
                            
                        )
                    })
                }
            </div>
        </>
        
    )
}

export default Card;