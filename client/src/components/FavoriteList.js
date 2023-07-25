import React, {useContext, useEffect, useState} from "react";
import Template from "./Template";
import { Link } from "react-router-dom";
import PostService from "../services/PostService";

const TemplateList = () => {
    // const { template, loading } = useContext(TemplateContext);
    const [loading, SetLoading] = useState(false);
    const [template, SetTeamplate] = useState([])
    useEffect(() => {
        const getTeamplates = async  () => {
            return await PostService.getFavorite();
        }
        getTeamplates().then((resp)=> SetTeamplate(resp.data))
        SetLoading(true);
    }, []);


    return (
        <section className="mb-20">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
                    {template.map((temp, index) => {
                        return (
                            <Link to={`/property/${temp._id}`} key={temp._id}>
                                <Template temp={temp} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TemplateList;
