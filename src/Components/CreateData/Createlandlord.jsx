import React, { useState } from 'react'
import axios from 'axios';
const Createlandlord = () => {
    const [records, setRecord] = useState({
        landlord_name: '',
        location: '',
        rent: '',
        created_at: '',
        // updated_at: ''


    });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://upkeep.crmcity.org:8093/adminpanel/landlord/', records)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="landlord_name"
                    placeholder="landlord name"
                    value={records.landlord_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={records.location}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    name="rent"
                    placeholder="Rent"
                    value={records.rent}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="date"
                    name="created_at"
                    placeholder="created at"
                    value={records.created_at}
                    onChange={handleChange}
                />
            </div>
            {/* <div>
                <input
                    type="date"
                    name="updated_at"
                    placeholder="updated at"
                    value={records.updated_at}
                    onChange={handleChange}
                />
            </div> */}
            <button type="submit">Create</button>
        </form>
    );
};
export default Createlandlord
