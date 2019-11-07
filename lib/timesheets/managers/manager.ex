defmodule Timesheets.Managers.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    has_many :workers, Timesheets.Workers.Worker
    has_many :jobs, Timesheets.Jobs.Job
    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [:email, :name, :password])
    |> validate_length(:password, min: 12)
    |> hash_password()
    |> validate_required([:email, :name, :password_hash])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)

    if pw do
      change(cset, Argon2.add_hash(pw))
    else
      cset
    end
  end
end
