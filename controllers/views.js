export class ViewsController {
  constructor ({ model }) {
    this.model = model
  }

  getGroup = async (req, res) => {
    const result = await this.model.getOneTeam(req.params.id)
    if (!result.success) {
      if (result.error.type === 'VALIDATION ERROR') {
        return res.status(400).json(result.error)
      }
      return res.status(500).json(result.error)
    }

    const data = result.data
    res.render('group-page', { data })
  }
}
