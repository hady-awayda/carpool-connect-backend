export const setCreatedBy = (req, res, next) => {
  if (req.user) {
    req.body.created_by = req.user.id;
  }
  next();
};

export const setUpdatedBy = (req, res, next) => {
  if (req.user) {
    req.body.updated_by = req.user.id;
    req.body.updated_at = new Date();
  }
  next();
};

export const setDeletedBy = (req, res, next) => {
  if (req.user) {
    req.body.deleted_by = req.user.id;
    req.body.deleted_at = new Date();
  }
  next();
};
