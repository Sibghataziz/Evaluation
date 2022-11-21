import hostelModel from "../Database/hostel.model.js";

async function getAllHostels(req, res) {
  const hostels = await hostelModel.find();

  return res.send({
    status: "success",
    data: hostels,
  });
}

async function getHostel(req, res) {
  const { id } = req.params;

  const hostel = await hostelModel.findById({
    _id: id,
  });

  return res.send({
    status: "success",
    data: hostel,
  });
}

async function getBookedHostels(req, res) {
  const { isAdmin, email } = req.user;
  let hostels;
  if (isAdmin) {
    hostels = await hostelModel.find({
      isBooked: true,
    });
  } else {
    hostels = await hostelModel.find({
      "userBooked.email": email,
    });
  }

  return res.send({
    status: "success",
    data: hostels,
  });
}

async function addHostels(req, res) {
  const { isAdmin } = req.user;
  if (isAdmin) {
    const hostel = req.body;
    const newHostel = await hostelModel.create(hostel);
    return res.send({
      status: "success",
      data: newHostel,
    });
  } else {
    return res.send({
      status: "error",
      message: "Only Admin have the access to add Hostels.",
    });
  }
}

async function bookHostel(req, res) {
  const { id } = req.params;
  const { _id, name, email } = req.user;
  const update = {
    isBooked: true,
    userBooked: {
      _id,
      name,
      email,
    },
  };

  const hostel = await hostelModel.findByIdAndUpdate(
    {
      _id: id,
    },
    update,
    { new: true }
  );

  return res.send({
    status: "success",
    data: hostel,
  });
}

export { getAllHostels, getHostel, getBookedHostels, addHostels, bookHostel };
