import { http } from './http';
import { success, fail } from './reply';

const TaskAPI = {
  async find({ projectId }) {
    try {
      const response = await http.get(
        `/users/current/projects/${projectId}/tasks`
      );
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async findOne({ id, projectId }) {
    try {
      const response = await http.get(
        `/users/current/projects/${projectId}/tasks/${id}`
      );
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async create({ projectId, data }) {
    try {
      const response = await http.post(
        `/users/current/projects/${projectId}/tasks`,
        data
      );
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async update({ id, projectId, data }) {
    try {
      const response = await http.put(
        `/users/current/projects/${projectId}/tasks/${id}`,
        data
      );
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async remove({ id, projectId }) {
    try {
      const response = await http.delete(
        `/users/current/projects/${projectId}/tasks/${id}`
      );
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },
};

export default TaskAPI;
