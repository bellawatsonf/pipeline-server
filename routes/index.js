const router = require("express").Router();
const PegawaiController = require("../controllers/pegawai");
const GroupController = require("../controllers/group");
const SektorController = require("../controllers/sektor");
const PengajuanController = require("../controllers/statuspengajuan");
const ProgressController = require("../controllers/progress");
const PipelineController = require("../controllers/pipeline");
const {
  authentication,
  authorizeSektor,
  authorizeStatusPengajuan,
  authorizeProgress,
  authorizePegawai,
  authorizeGetSektor,
  authorizeGroup,
} = require("../middleware/auth");

router.post("/login", PegawaiController.login);
router.use(authentication);
router.get("/pegawai", authorizePegawai, PegawaiController.getPegawai);
router.post("/add-pegawai", authorizePegawai, PegawaiController.addPegawai);
router.get("/pegawai/:id", authorizePegawai, PegawaiController.getPegawaiById);
router.patch(
  "/edit-password/:id",
  authorizePegawai,
  PegawaiController.editPasswordPegawai
);

router.put(
  "/edit-pegawai/:id",
  authorizePegawai,
  PegawaiController.editPegawai
);
router.delete(
  "/delete-pegawai/:id",
  authorizePegawai,
  PegawaiController.deletePegawai
);

router.get("/sektor", SektorController.getSektor);
router.post("/add-sektor", authorizeGetSektor, SektorController.addSektor);
router.get("/sektor/:id", authorizeGetSektor, SektorController.getSektorById);
router.put("/edit-sektor/:id", authorizeGetSektor, SektorController.editSektor);
router.delete(
  "/delete-sektor/:id",
  authorizeGetSektor,
  SektorController.deleteSektor
);

router.get(
  "/pengajuan",
  // authorizeStatusPengajuan,
  PengajuanController.getPengajuan
);
router.post(
  "/add-pengajuan",
  authorizeStatusPengajuan,
  PengajuanController.addPengajuan
);
router.get(
  "/pengajuan/:id",
  authorizeStatusPengajuan,
  PengajuanController.getPengajuanById
);

router.put(
  "/edit-pengajuan/:id",
  authorizeStatusPengajuan,
  PengajuanController.editPengajuan
);
router.delete(
  "/delete-pengajuan/:id",
  authorizeStatusPengajuan,
  PengajuanController.deletePengajuan
);

router.get("/progress", ProgressController.getProgress);
router.post("/add-progress", authorizeProgress, ProgressController.addProgress);
router.get(
  "/progress/:id",
  authorizeProgress,
  ProgressController.getProgressById
);

router.put(
  "/edit-progress/:id",
  authorizeProgress,
  ProgressController.editProgress
);
router.delete(
  "/delete-progress/:id",
  authorizeProgress,
  ProgressController.deleteProgress
);

router.get("/group", GroupController.getGroup);
router.post("/add-group", authorizeGroup, GroupController.addGroup);
router.get("/group/:id", authorizeGroup, GroupController.getGroupById);
router.put("/edit-group/:id", authorizeGroup, GroupController.editGroup);
router.delete("/delete-group/:id", authorizeGroup, GroupController.deleteGroup);

router.get("/pipeline", PipelineController.getPipeline);
router.get("/pipeline-user", PipelineController.getPipelineUser);
router.get("/pipeline-dashboard", PipelineController.getPipelineDashboard);

router.post("/add-pipeline", PipelineController.addPipeline);
router.get("/pipeline/:id", PipelineController.getPipelineById);

router.put(
  "/edit-pipeline/:id",
  // authorizePipeline,
  PipelineController.editPipeline
);
router.patch(
  "/delete-pipeline/:id",
  // authorizePipeline,
  PipelineController.deletePipeline
);
router.delete(
  "/delete-pipelineadmin/:id",
  // authorizePipeline,
  PipelineController.deletePipelineAdmin
);
module.exports = router;
