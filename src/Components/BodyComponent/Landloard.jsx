import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDeleteSweep } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { Button, Modal } from 'react-bootstrap';
import { AiOutlineFolderAdd } from 'react-icons/ai'
// import Popup from 'reactjs-popup';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import create from '@ant-design/icons/lib/components/IconFont';


const Landloard = () => {


  // delete functionality 

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const handleClose = () => {
    setShowModal(false);
  };


  // to create data 

  // const [dataTableData, setDataTableData] = useState();
  const [formData, setFormData] = useState({
    landlord_name: "",
    location: "",
    rent: "",
    created_at: "",
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
      const response = await axios.post("http://upkeep.crmcity.org:8093/adminpanel/landlord/", formData);
      console.log(response.data);
      getLandloard();
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

  // const [newData, setNewData] = useState({
  //   landlord_id: null,
  //   landlord_name: '',
  //   location: '',
  //   rent: '',
  //   created_at: '',
  // });
  // const [showModal4, setShowModal4] = useState(false);

  // modal 1 delete   
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // modal 2 view 
  // let row = (landlord_id) => {
  //   getLandloard(landlord_id);
  //   deletelandlord(landlord_id);
  // }
  const [landloard, setLandloard] = useState([]);
  const [search, setSearch] = useState("");
  const [fileterData, setFilterData] = useState([]);
  const getLandloard = async () => {
    try {
      const response = await axios.get('http://upkeep.crmcity.org:8093/adminpanel/landlord/')
      setLandloard(response.data);
      setFilterData(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  // create functionality 
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewData((prevData) => ({ ...prevData, [name]: value }));
  // };



  // view data 
  const [show5, setShow5] = useState(false);
  const [selectedRow5, setSelectedRow5] = useState();


  const handleClose5 = () => {
    setShow5(false);
  }

  const handleShow5 = (row) => {
    setSelectedRow5(row);
    setShow5(true);
  };

  // create axios data 

  //  deleteing modal of landlord th api axios
  const handleDelete = (landlord_id) => {
    console.log("successfully deleted")
    // axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/landlord/` + { landlord_id })
    axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/landlord/${landlord_id}/`)
      .then(() => {
        getLandloard();
        console.log("succefully refresh")
        handleClose();
      })
      .catch(() => {

      });
  };







  // update functionality trail 


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
  // put method to update
  const handleUpdate = () => {
    // event.preventDefault();
    console.log(selectedRoww)
    // console.log(event)

    // console.log(form)
    axios.put(`http://upkeep.crmcity.org:8093/adminpanel/landlord/${selectedRoww.landlord_id}/`, updatedData)
      // Object.fromEntries(formData))
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        getLandloard();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //  updateing from with axios api 
  // const handleUpdate = () => {
  //   axios
  //     .put(`http://upkeep.crmcity.org:8093/adminpanel/landlord/${selectedrow.landlord_id}/`, selectedrow)
  //     .then(() => {
  //       console.log(selectedrow.landlord_id)
  //       console.log(selectedrow)
  //       // console.log(landlord_id)
  //       console.log('handle update')
  //       setShowModal2(false);
  //       getLandloard();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  //  update modal fucntionality 
  // const handleRowClicked = (row) => {
  //   setSelectedRow(row);
  //   // console.log(landlord_id);
  //   console.log(selectedrow.landlord_id)
  //   setShowModal2(true);
  // };
  // const handleFieldChange = (event) => {
  //   const { name, value } = event.target;
  //   setSelectedRow((prevRow) => ({
  //     ...prevRow,
  //     [name]: value,
  //   }));
  // };

  let columns = [
    {
      name: "Landlord_ID",
      selector: (row) => row.landlord_id,
    },
    {
      name: "Landlord_Name",
      selector: (row) => row.landlord_name,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Rate",
      selector: (row) => row.rent,
    },
    {
      name: "Create",
      selector: (row) => row.created_at,
    },
    {
      name: "Action",
      cell: (row) => <>
        <section>
          <Button className='btn btn-primary me-2' onClick={() => handleShow4(row)}>

            <MdEditNote /></Button>

        </section>
        <section className='me-2'> <Button variant="danger" onClick={() => {
          console.log(row);
          setSelectedId(row.landlord_id);
          console.log(row.landlord_id);
          setShowModal(true);
        }}>
          <MdDeleteSweep />
        </Button>

        </section>
        {/* <div className='p-5'><Button variant='danger' onClick={() => deletelandlord(row.landlord_id)}>Confirm</Button></div> */}
        <section className='me-2'> <Button variant="success" className='me-2' onClick={() => handleShow5(row)}

        >
          <GrView />
        </Button>
        </section>
        {/* <div className='p-5'>{row.landlord_name}<br /><hr />{row.location}<br /><hr />{row.rent}<br /><hr />{row.created_at}</div> */}
      </>
    }
  ]
  useEffect(() => {
    getLandloard();
    // handleDelete()
    console.log("using use effect")
  }, []);
  useEffect(() => {
    const result = landloard.filter(Landloard => {
      return Landloard.landlord_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilterData(result)
  }, [search]);
  return (
    <>
      <DataTable title="Landloard" columns={columns} data={fileterData} pagination fixedHeader selectableRows highlightOnHover
        subHeader subHeaderComponent={
          <>
            {/* delete modal */}
            <Modal show={showModal} onHide={handleClose} style={{ marginTop: "90px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Delete item</Modal.Title>
              </Modal.Header>
              <Modal.Body>Confirm delete</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger"
                  onClick={() => {
                    handleDelete(selectedId);
                    handleClose();
                  }}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            {/* update modal  */}


            <Modal show={show4} onHide={handleClose4} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Landlord: {selectedRoww.landlord_id} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLandlord_Name" className="mb-3">
                    <Form.Label>Landlord Name</Form.Label>
                    <Form.Control type="text" name="landlord_name" defaultValue={selectedRoww?.landlord_name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Loation</Form.Label>
                    <Form.Control type="text" name="location" defaultValue={selectedRoww?.location} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formRent" className="mb-3">
                    <Form.Label>Rent</Form.Label>
                    <Form.Control type="number" name="rent" defaultValue={selectedRoww?.rent} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>Create</Form.Label>
                    <Form.Control type="date" name="created_at" defaultValue={selectedRoww?.created_at} onChange={handleInputChange} />
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


            {/* View modal  */}
            <Modal show={show5} onHide={() => handleClose5()} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>View Landlord </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group >
                    <Form.Label>Landlord Name </Form.Label>
                    <Form.Control type="text" name="Landlord_Name" defaultValue={selectedRow5?.landlord_name} disabled />
                  </Form.Group>

                  <Form.Group >
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="Location" defaultValue={selectedRow5?.location} disabled />
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Rent</Form.Label>
                    <Form.Control type="number" name="Rate" defaultValue={selectedRow5?.rent} disabled />
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Created at</Form.Label>
                    <Form.Control type="date" name="Create" defaultValue={selectedRow5?.created_at} disabled />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose5()}>
                  Back
                </Button>
              </Modal.Footer>
            </Modal>

            {/* create modal  */}

            <Modal show={showModalC} onHide={() => handleCloseModal()} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Add Landlord</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="Landlord name" className=' ms-2'>
                    <Form.Label>Landloard Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="landlord_name"
                      value={formData.landlord_name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="location" className=' ms-2'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Rent</Form.Label>
                    <Form.Control
                      type="number"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="created at" className=' ms-2 mb-3'>
                    <Form.Label>Crated_at</Form.Label>
                    <Form.Control
                      type="date"
                      name="created_at"
                      value={formData?.created_at}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className=' ms-1' onClick={() => handleCreate()}>
                    Add Landloard
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
              {/* posting data modal  */}
            </div>
          </>
        }
      />
    </>
  )
}
export default Landloard;