import { apiHelper } from "../utils/helpers"

export default {
  putReply({reply_id, reply}) {
    return apiHelper.put(`/replies/${reply_id}`, reply)
  },
  deleteReply({reply_id}) {
    return apiHelper.delete(`/replies/${reply_id}`)
  }
}