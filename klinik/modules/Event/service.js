import Model from "./model.js";
import moment from "moment";
// import db from "../../db.js";

const addEvent = async (user, trainer, startDate, endDate, title) => {
  //   let session = await db.startSession();

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

    // session.startTransaction();

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
    // await session.abortTransaction();
    // await session.endSession();
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
  //   .populate(["venue", "show", "category", "deal", "seatPlan"]);

  return { events };
};

const deleteEvent = async eventId => {
  try {
    await Model.Event.deleteOne({ _id: eventId });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateEvent = async (
  eventId,
  user,
  trainer,
  startDate,
  endDate,
  title
) => {
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

    return Model.Event.findOneAndUpdate(
      { _id: isExistEvent._id },
      { user, trainer, startDate, endDate, title },
      { new: true }
    );
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
