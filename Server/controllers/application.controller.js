import Application from "../models/application.model.js";

export const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const result = await Application.aggregate([
      {
        $facet: {
          applications: [
            {
              $match: filter,
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
          ],

          stats: [
            {
              $group: {
                _id: "$status",
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
    ]);

    const applications = result[0].applications;

    const stats = {
      total: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    result[0].stats.forEach((item) => {
      stats.total += item.count;

      if (item._id === "Interviewing") {
        stats.interview = item.count;
      }

      if (item._id === "Offer") {
        stats.offer = item.count;
      }

      if (item._id === "Rejected") {
        stats.rejected = item.count;
      }
    });

    return res.status(200).json({
      success: true,
      applications,
      stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getapplication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addApplication = async (req, res) => {
  try {
    const { company, role, type, status, date, note } = req.body;
    if (!company || !role || !type || !status || !date)
      return res.status(400).json({ success: false, message: "Missing Field" });
    console.log("add");

    const application = await Application.create({
      company,
      role,
      type,
      status,
      date,
      note,
    });

    return res.status(201).json({
      success: true,
      message: "Application added",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, type, status, date, note } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      {
        company,
        role,
        type,
        status,
        date,
        note,
      },
      { new: true, runValidators: true },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
