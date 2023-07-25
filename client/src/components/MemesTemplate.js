import React from "react";

const MemesTemplate = ({ temp }) => {
    const back = "http://localhost:5000/static/patterns/"
    const { _id, author, img } = temp;

    return (
        <div
            className="bg-white shadow-1 p-5 rounded-lg
    w-full max-w-[352px] mx-auto cursor-pointer
    hover:shadow-2xl transition"
        >
            <h1>{_id}</h1>
            <img className="mb-8" src={back+img} alt="" />
            {/*<div className="text-lg font-semibold max-w-[260px]">*/}
            {/*    {hashtag.map((item, index) => (index ? ", " : "") + item)}*/}
            {/*</div>*/}
        </div>
    );
};

export default MemesTemplate;
