"""Aded username

Revision ID: b63024eca4ee
Revises: 8de2334ef6e3
Create Date: 2024-08-01 13:00:10.640578

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b63024eca4ee'
down_revision = '8de2334ef6e3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.drop_column('username')

    # ### end Alembic commands ###
