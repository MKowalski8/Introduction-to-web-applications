from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import post_load

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Base(DeclarativeBase):
    pass
class Person(db.Model):
    id: Mapped[int] = mapped_column(db.Integer,primary_key=True)
    name: Mapped[str] = mapped_column(db.String)
    surname: Mapped[str] = mapped_column(db.String)
    job: Mapped[str] = mapped_column(db.String)
    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)

ma = Marshmallow(app)
class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add(Person(name="ser",surname="serowy",job='it'))
    db.session.add(Person(name="Mła",surname="Tłą",job='coś'))
    db.session.commit()


@app.route('/hello/<name>')
def hello(name):
   return 'Hello %s' % name
@app.route('/')
def helloWorld():
        return "Hello World"

@app.route('/person')
def person():
    persons_query = Person.query.all()
    persons_schema = PersonSchema(many=True)
    result = persons_schema.dump(persons_query)
    return jsonify(result)



@app.route('/person/<id>')
def personByID(id):
    persons_query = Person.query.get_or_404(id)   
    persons_schema = PersonSchema()
    result = persons_schema.dump(persons_query)
    return jsonify(result)


# @app.route('/person/<surname>')
# def personBySurname(surname):
#     persons_query = Person.query.filter_by(surname=surname).all()

#     if not persons_query:
#         return jsonify(message="No persons found with the given surname"), 404

#     persons_schema = PersonSchema(many=True)
#     result = persons_schema.dump(persons_query)
#     return jsonify(result)

@app.route('/create', methods=['POST'])
def createPerson():
    data = request.get_json()


    person_schema = PersonSchema()
    new_person = Person.make_user(person_schema, data)
    db.session.add(new_person)
    db.session.commit()
    return jsonify(message="Person added successfully", id=new_person.id), 201


if __name__ == '__main__':
    app.run()
