defmodule Timesheets.WorkersTest do
  use Timesheets.DataCase

  alias Timesheets.Workers

  describe "workers" do
    alias Timesheets.Workers.Worker

    @valid_attrs %{email: "some email", name: "some name", password_hash: "some password_hash"}
    @update_attrs %{email: "some updated email", name: "some updated name", password_hash: "some updated password_hash"}
    @invalid_attrs %{email: nil, name: nil, password_hash: nil}

    def worker_fixture(attrs \\ %{}) do
      {:ok, worker} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Workers.create_worker()

      worker
    end

    test "list_workers/0 returns all workers" do
      worker = worker_fixture()
      assert Workers.list_workers() == [worker]
    end

    test "get_worker!/1 returns the worker with given id" do
      worker = worker_fixture()
      assert Workers.get_worker!(worker.id) == worker
    end

    test "create_worker/1 with valid data creates a worker" do
      assert {:ok, %Worker{} = worker} = Workers.create_worker(@valid_attrs)
      assert worker.email == "some email"
      assert worker.name == "some name"
      assert worker.password_hash == "some password_hash"
    end

    test "create_worker/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Workers.create_worker(@invalid_attrs)
    end

    test "update_worker/2 with valid data updates the worker" do
      worker = worker_fixture()
      assert {:ok, %Worker{} = worker} = Workers.update_worker(worker, @update_attrs)
      assert worker.email == "some updated email"
      assert worker.name == "some updated name"
      assert worker.password_hash == "some updated password_hash"
    end

    test "update_worker/2 with invalid data returns error changeset" do
      worker = worker_fixture()
      assert {:error, %Ecto.Changeset{}} = Workers.update_worker(worker, @invalid_attrs)
      assert worker == Workers.get_worker!(worker.id)
    end

    test "delete_worker/1 deletes the worker" do
      worker = worker_fixture()
      assert {:ok, %Worker{}} = Workers.delete_worker(worker)
      assert_raise Ecto.NoResultsError, fn -> Workers.get_worker!(worker.id) end
    end

    test "change_worker/1 returns a worker changeset" do
      worker = worker_fixture()
      assert %Ecto.Changeset{} = Workers.change_worker(worker)
    end
  end
end
