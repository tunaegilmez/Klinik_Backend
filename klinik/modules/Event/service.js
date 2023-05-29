import Model from "./model.js";
import moment from "moment";

const addEvent = async (user, trainer, startDate, endDate, title) => {
  try {
    let isExistEvent = await Model.Event.findOne({
      startDate: {
        $gte: moment(startDate).toDate(),
        $lte: moment(endDate).toDate(),
      },
    });

    if (isExistEvent) {
      throw new Error(
        JSON.stringify({
          en: "Already there is an event",
          tr: "Zaten bu tarihte randevu var",
        })
      );
    }

    let event = await new Model.Event({
      user,
      trainer,
      startDate,
      endDate,
      title,
    }).save({});

    return event;
  } catch (error) {
    console.log("addEvent service error", error.message);

    throw new Error(
      JSON.stringify({
        en: error.message,
        tr: error.message,
      })
    );
  }
};

const getEvents = async (query = {}) => {
  const events = await Model.Event.find(query, {}).sort({
    eventDate: 1,
  });
  return { events };
};

const deleteEvent = async eventId => {
  try {
    await Model.Event.deleteOne({ _id: eventId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateEvent = async (eventId, event) => {
  try {
    let isExistEvent = await Model.Event.findById(eventId);

    if (!isExistEvent) {
      throw new Error(
        JSON.stringify({
          en: "Event is not found.",
          tr: "Event bulunamadı.",
        })
      );
    }

    let updatedEvent = await Model.Event.findOneAndUpdate(
      { _id: isExistEvent._id },
      { ...event },
      { new: true }
    );

    return updatedEvent;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  addEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};
