const appointmentsRouter = require("express").Router();
const { AppointmentModel } = require("../models/appointment.model");


appointmentsRouter.post("/appointments", (req, res) => {
    const details = req.body

    const newAppointment = new AppointmentModel({ ...details, date: new Date() })
    newAppointment.save()
    res.send(newAppointment)
})

appointmentsRouter.get("/appointments", async (req, res) => {
    const query = req.query
    const { _page, _limit, ...searchQuery } = query

    let data = await AppointmentModel.find(searchQuery)

    res.send(data)

})
appointmentsRouter.patch("/appointments/:id", async (req, res) => {
    const id = req.params.id
    const appointment = await AppointmentModel.findById(id)
    await AppointmentModel.findByIdAndUpdate(id, { slots: appointment.slots - 1 })

    res.send({ message: "Aappointment Booked" })

})


module.exports = {
    appointmentsRouter
}

