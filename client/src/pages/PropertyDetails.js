import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {MdFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import {Context} from "../index";

const PropertyDetails = () => {
    const {id} = useParams();
    const [isFavorite, setFavorite] = useState((false));
    const [template, SetTeamplate] = useState(null);
    const [loading, Setloading] = useState(true);
    const {store} = useContext(Context);
    const back = "http://localhost:5000/static/patterns/"
    useEffect(() => {

        const getTemplates = async () => {
            return await PostService.currentTemplates(id);
        }
        getTemplates().then((resp) => {
            SetTeamplate(resp.data)

        }).finally(() => Setloading(false));
    }, []);



    useEffect(() => {
        if (template){
            if(template.userLikes.some((user) => user === store.id)){
                setFavorite(true);
            }
        }

    },[template])

    const handleChangeFavorite = async (isFavorite) => {

        if (!isFavorite) {
            const addlike = async () => {
                await UserService.like(id);
            }
            addlike().then((resp) => {
                console.log("like add", resp);
            })
        }
        if (isFavorite) {
            const deletelike = async () => {
                await UserService.unlike(id);
            }
            deletelike().then((resp) => {
                console.log("like delete", resp);
            })
        };
        setFavorite((isFavorite) => !isFavorite);
    };
        if (loading) {
            return (<div>
                loading
            </div>)
        }
        console.log("TEMp", template)
        return (
            <section className="container mx-auto min-h-[800px] mb-14">
                <div>
                    <div className="flex flex-col lg:flex-col lg: items-center lg: justify-between">
                        <h1 className="text-2xl">
                            <span>{template.name}</span>
                            <button onClick={() => handleChangeFavorite(isFavorite)}>
                                {isFavorite ? <MdFavorite/> : <MdOutlineFavoriteBorder/>}
                            </button>
                        </h1>

                        <img src={back + template.img} alt=""/>
                        <h2 className="text-lg mb-4 font-semibold">
                            {template.hashtag.map((item, index) => (index ? ", " : "") + item)}
                        </h2>
                        <div className="text-center">
                            <Link to={`/memescreator/${template._id}`}>Создать мем</Link>
                        </div>
                    </div>
                </div>
            </section>
        );


};
export default PropertyDetails;
