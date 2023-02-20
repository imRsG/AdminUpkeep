import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDeleteSweep } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { Button, Modal, Form } from 'react-bootstrap';

const Repairer = () => {

  //  delte modal function

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const handleClose = () => {
    setShowModal(false);
  };

  const [repairs, setRepairs] = useState([]);
  const [search, setSearch] = useState("");
  const [fileterData, setFilterData] = useState([]);
  const getRepairs = async () => {
    try {
      const response = await axios.get('http://upkeep.crmcity.org:8093/adminpanel/repaircont/')
      setRepairs(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (landlord_id) => {
    console.log("successfully deleted")
    // axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/repaircont/` + { landlord_id })
    axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/repaircont/${landlord_id}/`)
      .then(() => {
        getRepairs();
        console.log("succefully refresh")
        handleClose();
      })
      .catch(() => {

      });
  };


  // update functionality 
  const handleUpdate = () => {
    // event.preventDefault();
    console.log(selectedRoww)
    // console.log(event)

    // console.log(form)
    axios.put(`http://upkeep.crmcity.org:8093/adminpanel/repaircont/${selectedRoww.id}/`, updatedData)
      // Object.fromEntries(formData))
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        getRepairs();
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

  // create functionality 

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
      const response = await axios.post(`http://upkeep.crmcity.org:8093/adminpanel/repaircont/`, formData);
      console.log(response.data);
      getRepairs();
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

  const columns = [
    {
      name: "Repairer_ID",
      selector: (row) => row.id,
      width: "100px"
    },
    {
      name: " Name",
      selector: (row) => row.name,
      width: "140px"
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Contact_no",
      selector: (row) => row.contact_no,
      width: "140px"
    },
    {
      name: "Type_Of_Repairs",
      selector: (row) => row.type_of_repairs,
      width: "140px"
    },
    {
      name: "Action",
      cell: (row) => <>
        <section>
          <Button className='btn btn-primary me-2' onClick={() => handleShow4(row)}>
            <MdEditNote /></Button>
        </section>
        <section>
          <Button className='btn btn-danger me-2'><MdDeleteSweep onClick={() => {
            setSelectedId(row.id);
            console.log(row.id);
            setShowModal(true);
          }} /> </Button></section>
        {/* <Popup trigger={<button className='btn btn-primary me-2'><MdDeleteSweep /> </button>} position="left center">
          <div className='p-5'><Button variant='danger' onClick={() => deleteRecord(row.id)}>Confirm</Button></div>
        </Popup> */}
        <section className='me-2'> <Button variant="success" className='me-2' onClick={() => handleShow5(row)}>
          <GrView />
        </Button>
        </section>
      </>
    }
  ]
  useEffect(() => {
    getRepairs();
    // console.log("api is hiting use ffect")
  }, []);
  useEffect(() => {
    const result = repairs.filter(Repairer => {
      return (Repairer.name, Repairer.type_of_repairs).toLowerCase().match(search.toLocaleLowerCase());

    });
    setFilterData(result)
  }, [search]);


  return (

    <>

      <DataTable title="RepaireList" columns={columns} data={fileterData} pagination fixedHeader selectableRows highlightOnHover
        subHeader
        subHeaderComponent={
          <section className='pt-5'>
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
                  // onClick={handleClose}

                  // onClick={deleteRecord}
                  onClick={() => {
                    handleClose();
                    handleDelete(selectedId);
                  }}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>


            {/* update modal  */}

            <Modal show={show4} onHide={handleClose4} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Reapairer: {selectedRoww.id} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLandlord_Name" className="mb-3">
                    <Form.Label>Repairer Name</Form.Label>
                    <Form.Control type="text" name="tenant_name" defaultValue={selectedRoww.name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="location" defaultValue={selectedRoww.email} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formRent" className="mb-3">
                    <Form.Label>conatact No.</Form.Label>
                    <Form.Control type="number" name="contact_no" defaultValue={selectedRoww.contact_no} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>Type of repaire</Form.Label>
                    <Form.Control type="text" name="type_of_repairs" defaultValue={selectedRoww.type_of_repairs} onChange={handleInputChange} />
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
            <Modal show={show5} onHide={() => handleClose5()} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>View Repairer </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Repairer Name </Form.Label>
                    <Form.Control type="text" name="name" defaultValue={selectedRow5?.name} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="email" name="email" defaultValue={selectedRow5?.email} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control type="number" name="contact_no" defaultValue={selectedRow5?.contact_no} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Type of repairer</Form.Label>
                    <Form.Control type="text" name="type_of_repairs" defaultValue={selectedRow5?.type_of_repairs} disabled />
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
                <Modal.Title>Add Repairer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="Landlord name" className=' ms-2'>
                    <Form.Label>Repairer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="location" className=' ms-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="rent" className=' ms-2'>
                    <Form.Label>Contact No</Form.Label>
                    <Form.Control
                      type="number"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="created at" className=' ms-2 mb-3'>
                    <Form.Label>Type of Repairer</Form.Label>
                    <Form.Control
                      type="text"
                      name="type_of_repairs"
                      value={formData?.type_of_repairs}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className=' ms-1' onClick={() => handleCreate()}>
                    Add Tenant
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
  )
}
export default Repairer;