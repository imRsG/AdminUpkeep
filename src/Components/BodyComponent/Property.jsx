import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDeleteSweep } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

import { AiOutlineFolderAdd } from 'react-icons/ai'
import { Button, Modal, Form } from 'react-bootstrap';

// import Modal from 'react-modal';


const Property = () => {
  // const [modalIsOpen, setIsOpen] = React.useState(false);
  const [property, setProperty] = useState([]);
  const [search, setSearch] = useState("");
  const [fileterData, setFilterData] = useState([]);
  const getProperty = async () => {
    try {
      const response = await axios.get('http://upkeep.crmcity.org:8093/adminpanel/proaction/')
      setProperty(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.log(error);

    }
  };

  // delete functionality 

  const handleDelete = (id) => {
    console.log("successfully deleted")
    // axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/proaction/` + { landlord_id })
    axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/proaction/${id}/`)
      .then(() => {
        getProperty();
        console.log("succefully refresh")
        handleClose();
      })
      .catch(() => {

      });
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const handleClose = () => {
    setShowModal(false);
  };

  // view fucntionality 
  const [show5, setShow5] = useState(false);
  const [selectedRow5, setSelectedRow5] = useState();


  const handleClose5 = () => {
    setShow5(false);
  }

  const handleShow5 = (row) => {
    setSelectedRow5(row);
    setShow5(true);
  };

  // update functionality 
  const handleUpdate = () => {
    // event.preventDefault();
    console.log(selectedRoww)
    // console.log(event)

    // console.log(form)
    axios.put(`http://upkeep.crmcity.org:8093/adminpanel/proaction/${selectedRoww.id}/`, updatedData)
      // Object.fromEntries(formData))
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        getProperty();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [show4, setShow4] = useState(false);
  const [selectedRoww, setSelectedRoww] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const handleClose4 = () => {
    setShow4(false);
  }

  const handleShow4 = (row) => {
    setSelectedRoww(row);
    setShow4(true);
  };
  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value,
    });
  };

  // create funationality 


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    type_of_repairs: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("this is passed")
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCreate = async (event) => {
    // event.preventDefault();
    console.log(event);
    console.log(formData)
    try {
      const response = await axios.post(`http://upkeep.crmcity.org:8093/adminpanel/proaction/`, formData);
      console.log(response.data);
      getProperty();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  const [showModalC, setShowModalC] = useState(false);

  const handleShowModal = () => {
    setShowModalC(true);
  };
  const handleCloseModal = () => {
    setShowModalC(false);
  };


  const columns = [
    {
      name: "Property_ID",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: " Property_Name",
      selector: (row) => row.propertyName,
      width: "130px",
    },
    {
      name: " Total_Room",
      selector: (row) => row.totalRoom,
      width: "130px",
    },
    {
      name: "Property_Capacity",
      selector: (row) => row.propertyCapacity,
      width: "120px",
    },
    {
      name: "Address1",
      selector: (row) => row.address1,

    },
    {
      name: "Address2",
      selector: (row) => row.address2,

    },
    {
      name: "City",
      selector: (row) => row.city,
      width: "70px",
    },
    {
      name: "Post_Code",
      selector: (row) => row.postCode,

    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "State",
      selector: (row) => row.state,

    },
    {
      name: "Property_image",
      selector: (row) => <img width={50} height={50} src={row.images} alt />,

    },
    {
      name: "Action",
      cell: row => <><section>
        <Button className='btn btn-primary me-2' onClick={() => handleShow4(row)}>
          <MdEditNote /></Button>
      </section>
        <section>
          <Button className='btn btn-danger me-2'><MdDeleteSweep onClick={() => {
            setSelectedId(row.id);
            console.log(row.id);
            setShowModal(true);
          }} /> </Button></section>
        <section className='me-2'> <Button variant="success" className='me-2' onClick={() => handleShow5(row)}>
          <GrView />
        </Button>
        </section></>
    }
  ]
  useEffect(() => {
    getProperty();
    // deleteRecord();
  }, []);
  useEffect(() => {
    const result = property.filter(propertyName => {
      return propertyName.name.toLowerCase().match(search.toLocaleLowerCase());
    });

    setFilterData(result)
  }, [search]);
  return (

    <>

      <DataTable title="Property" columns={columns} data={fileterData} pagination fixedHeader selectableRows highlightOnHover
        subHeader subHeaderComponent={
          <section className='mt-5 mb-5'>
            {/* delte modal  */}
            <Modal show={showModal} onHide={() => handleClose()} style={{ marginTop: "90px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Delete item</Modal.Title>
              </Modal.Header>
              <Modal.Body>Confirm delete</Modal.Body>
              <Modal.Footer>

                <Button variant="secondary" onClick={() => handleClose()}>
                  Close
                </Button>
                <Button variant="danger"
                  onClick={() => {
                    handleClose();
                    handleDelete(selectedId);
                  }}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            {/* View modal  */}
            <Modal show={show5} onHide={() => handleClose5()} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>View Property </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  {/* <Form.Group className="mb-3">
                    <Form.Control type="file" name="propertyName" defaultValue={selectedRow5?.row.images} disabled />
                  </Form.Group> */}
                  <Form.Group className="mb-3">
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control type="text" name="propertyName" defaultValue={selectedRow5?.propertyName} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Property Capicity</Form.Label>
                    <Form.Control type="number" name="propertyCapacity" defaultValue={selectedRow5?.propertyCapacity} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address1</Form.Label>
                    <Form.Control type="text" name="address1" defaultValue={selectedRow5?.address1} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" defaultValue={selectedRow5?.city} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>PostCode</Form.Label>
                    <Form.Control type="text" name="postCode" defaultValue={selectedRow5?.postCode} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" defaultValue={selectedRow5?.description} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" defaultValue={selectedRow5?.state} disabled />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose5()}>
                  Back
                </Button>
              </Modal.Footer>
            </Modal>


            {/* update modal  */}

            <Modal show={show4} onHide={handleClose4} style={{ paddingTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Property: {selectedRoww.id} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLandlord_Name" className="mb-3">
                    <Form.Label>Repairer Name</Form.Label>
                    <Form.Control type="text" name="propertyName" defaultValue={selectedRoww.propertyName} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Property Capacity</Form.Label>
                    <Form.Control type="number" name="propertyCapacity" defaultValue={selectedRoww.propertyCapacity} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Total Room</Form.Label>
                    <Form.Control type="number" name="totalRoom" defaultValue={selectedRoww.totalRoom} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formRent" className="mb-3">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control type="text" name="address1" defaultValue={selectedRoww.address1} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formRent" className="mb-3">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" name="address2" defaultValue={selectedRoww.address2} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" defaultValue={selectedRoww.city} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" name="postCode" defaultValue={selectedRoww.postCode} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" defaultValue={selectedRoww.description} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" defaultValue={selectedRoww.state} onChange={handleInputChange} />
                  </Form.Group>
                  <Button variant="primary" className=' ms-2' onClick={() => {
                    handleUpdate();
                    console.log(selectedRoww)
                    handleClose4();
                  }}>
                    Update
                  </Button>
                  <Button variant="primary" className=' ms-5' onClick={() => handleClose4()}>
                    cancle
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            {/* Create modal  */}
            <Modal show={showModalC} onHide={() => handleCloseModal()} className='pb-5' style={{ marginTop: "70px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Add Property</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="Landlord name" className=' ms-2'>
                    <Form.Label>property Name Name</Form.Label>
                    <Form.Control
                      type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="location" className=' ms-2'>
                    <Form.Label>Property Capicity</Form.Label>
                    <Form.Control
                      type="number" name="propertyCapacity" value={formData.propertyCapacity} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="location" className=' ms-2'>
                    <Form.Label>Total Room</Form.Label>
                    <Form.Control
                      type="number" name="totalRoom" value={formData.totalRoom} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text" name="address1" value={formData.address1} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text" name="address2" value={formData.address2} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="number" name="postCode" value={formData.postCode} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text" name="description" value={formData.description} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="created at" className=' ms-2 mb-3'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value={formData?.state} onChange={handleChange} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className=' ms-1' onClick={() => handleCreate()}>
                    Add Property
                  </Button>
                  <Button varient="primary" className=' ms-5' onClick={() => handleCloseModal()}>
                    CLose
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>

            <div className='d-flex justify-content-between'>
              <div className='me-5'>
                <input type='text' placeholder='search' className='w-100 form-control ' value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div><Button variant='primary' onClick={() => handleShowModal()}><AiOutlineFolderAdd className='me-3' /> create</Button></div>
            </div>
          </section>
        }
      />
    </>
  );
}
export default Property;