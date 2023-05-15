import Service from "./service.js";
import _ from "lodash";

const addEvent = async (req, res) => {
  const { user, trainer, startDate, endDate, title } = req.body;

  try {
    if (!req.admin) {
      throw new Error("You're not an admin.");
    }

    let event = await Service.addEvent(
      user,
      trainer,
      startDate,
      endDate,
      title
    );
    return res.json({
      status: true,
      event,
    });
  } catch (err) {
    console.log("addEvent Hatası", err);
    return res.json({ status: false, message: err.message });
  }
};

const getEvents = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let eventsQuery = _.omitBy(
      {
        createdAt:
          startDate || endDate
            ? {
                $gte: startDate
                  ? new Date(startDate)
                  : moment().startOf("day").toDate(),
                $lte: endDate
                  ? new Date(endDate)
                  : moment().endOf("day").toDate(),
              }
            : undefined,
      },
      a => a === undefined
    );

    let events = await Service.getEvents(eventsQuery);

    return res.json({ status: true, ...events });
  } catch (error) {
    console.log(error.message, "getEvents error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    await Service.deleteEvent(eventId);
    return res.json({
      status: true,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { user, trainer, startDate, endDate, title } = req.body;
  const { eventId } = req.params;

  try {
    let updatedEvent = await Service.updateEvent(
      eventId,
      user,
      trainer,
      startDate,
      endDate,
      title
    );
    return res.json({
      status: true,
      updatedEvent,
    });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};
