defmodule Timesheets.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :jobcode, :string, null: false
      add :budget, :integer, null: false
      add :description, :text, null: false
      add :manager_id, references(:managers, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:jobs, [:manager_id])
  end
end
