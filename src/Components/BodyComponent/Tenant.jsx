import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { MdEditNote, MdDeleteSweep } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { Button, Modal, Form } from 'react-bootstrap';

// import { Button, Modal, Space } from 'antd';

const Tenant = () => {

  const [tenant, setTenant] = useState([]);
  const [search, setSearch] = useState("");
  const [fileterData, setFilterData] = useState([]);
  const getTenant = async () => {
    try {
      const response = await axios.get('http://upkeep.crmcity.org:8093/adminpanel/tenant/')
      setTenant(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.log(error);

    }
  };
  const handleDelete = (tenant_id) => {
    console.log("successfully deleted")
    // axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/landlord/` + { landlord_id })
    axios.delete(`http://upkeep.crmcity.org:8093/adminpanel/tenant/${tenant_id}/`)
      .then(() => {
        getTenant();
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

  // update functionality 


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
    axios.put(`http://upkeep.crmcity.org:8093/adminpanel/tenant/${selectedRoww.tenant_id}/`, updatedData)
      // Object.fromEntries(formData))
      .then((response) => {
        console.log(response.data);
        console.log(response.data);
        getTenant();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create functionality 

  const [formData, setFormData] = useState({
    tenant_name: "",
    location: "",
    moved_in: "",
    moved_out: "",
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
      const response = await axios.post("http://upkeep.crmcity.org:8093/adminpanel/tenant/", formData);
      console.log(response.data);
      getTenant();
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

  const columns = [
    {
      name: "tenant_id",
      selector: (row) => row.tenant_id,
    },
    {
      name: "Name",
      selector: (row) => row.tenant_name,
    },
    {
      name: "location",
      selector: (row) => row.location,
    },
    {
      name: "moved_in",
      selector: (row) => row.moved_in,
    },
    {
      name: "moved_out",
      selector: (row) => row.moved_out,
    },
    {
      name: "Action",
      cell: row => <><section>
        <Button className='btn btn-primary me-2' onClick={() => handleShow4(row)}>
          <MdEditNote /></Button>
      </section>
        <section className='me-2'> <Button variant="danger" onClick={() => {
          console.log(row);
          setSelectedId(row.tenant_id);
          console.log(row.tenant_id);
          setShowModal(true);
        }}>
          <MdDeleteSweep />
        </Button>
        </section>
        <section className='me-2'> <Button variant="success" className='me-2' onClick={() => handleShow5(row)}>
          <GrView />
        </Button>
        </section>
      </>
    }
  ]
  useEffect(() => {
    getTenant();
  }, []);

  useEffect(() => {
    const result = tenant.filter(Tenant => {
      return Tenant.tenant_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilterData(result)
  }, [search]);
  return (

    <>

      <DataTable title="Tenant list" columns={columns} data={fileterData} pagination fixedHeader selectableRows highlightOnHover
        subHeader subHeaderComponent={
          <>
            <Modal show={showModal} onHide={() => handleClose()} style={{ marginTop: "90px" }}>
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

            {/* update functionality  */}

            <Modal show={show4} onHide={handleClose4} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Tenant: {selectedRoww.tenant_id} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formLandlord_Name" className="mb-3">
                    <Form.Label>Tenant Name</Form.Label>
                    <Form.Control type="text" name="tenant_name" defaultValue={selectedRoww.tenant_name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation" className="mb-3">
                    <Form.Label>Loation</Form.Label>
                    <Form.Control type="text" name="location" defaultValue={selectedRoww.location} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formRent" className="mb-3">
                    <Form.Label>Moved in</Form.Label>
                    <Form.Control type="date" name="moved_in" defaultValue={selectedRoww.moved_in} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group controlId="formCreate" className="mb-3">
                    <Form.Label>Moved out</Form.Label>
                    <Form.Control type="date" name="moved_out" defaultValue={selectedRoww.moved_out} onChange={handleInputChange} />
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

            {/* view data  */}
            <Modal show={show5} onHide={() => handleClose5()} style={{ marginTop: "60px" }}>
              <Modal.Header closeButton>
                <Modal.Title>View Tenant </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Tenant Name </Form.Label>
                    <Form.Control type="text" name="Landlord_Name" defaultValue={selectedRow5?.tenant_name} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" name="Location" defaultValue={selectedRow5?.location} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Moved in</Form.Label>
                    <Form.Control type="date" name="Rate" defaultValue={selectedRow5?.moved_in} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Moved out</Form.Label>
                    <Form.Control type="date" name="Create" defaultValue={selectedRow5?.moved_out} disabled />
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
                <Modal.Title>Add Tenant</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="Landlord name" className=' ms-2'>
                    <Form.Label>Tenant Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="tenant_name"
                      value={formData.tenant_name}
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
                    <Form.Label>Moved in</Form.Label>
                    <Form.Control
                      type="date"
                      name="moved_in"
                      value={formData.moved_in}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="created at" className=' ms-2 mb-3'>
                    <Form.Label>Moved Out</Form.Label>
                    <Form.Control
                      type="date"
                      name="moved_out"
                      value={formData?.moved_out}
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
          </>
        }

      />

    </>


  )
}
export default Tenant;