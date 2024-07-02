from flask import Flask, render_template, request, redirect, url_for, flash
import requests

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    # Realiza una solicitud GET a la API de productos
    response = requests.get('http://localhost:3000/api/productos')
    if response.status_code == 200:
        productos = response.json()
    else:
        productos = []
        flash('Error al obtener los productos', 'danger')

    return render_template('index.html', productos=productos)

@app.route('/create_product', methods=['GET', 'POST'])
def create_product():
    if request.method == 'POST':
        nombre = request.form['nombre']
        descripcion = request.form['descripcion']
        marca = request.form['marca']
        precio = request.form['precio']
        imagen = request.files['imagen']

        # Suponiendo que tu API está corriendo en localhost:5000
        url = 'http://localhost:3000/api/productos'
        files = {'imagen': imagen.read()}
        data = {
            'nombre': nombre,
            'descripcion': descripcion,
            'marca': marca,
            'precio': precio
        }

        response = requests.post(url, files=files, data=data)

        if response.status_code == 200:
            flash('Producto creado exitosamente', 'success')
        else:
            flash('Error al crear el producto', 'danger')

        return redirect(url_for('index'))

    return render_template('create_product.html')
# Ruta para actualizar un producto
@app.route('/update_product/<string:productId>', methods=['GET', 'POST'])
def update_product(productId):
    if request.method == 'POST':
        nombre = request.form['nombre']
        descripcion = request.form['descripcion']
        marca = request.form['marca']
        precio = request.form['precio']
        imagen = request.files['imagen'] if 'imagen' in request.files else None

        url = f'http://localhost:3000/api/productos/{productId}'
        files = {'imagen': imagen.read()} if imagen else None
        data = {
            'nombre': nombre,
            'descripcion': descripcion,
            'marca': marca,
            'precio': precio
        }

        response = requests.put(url, files=files, data=data)

        if response.status_code == 201:
            flash('Producto actualizado exitosamente', 'success')
        else:
            flash('Error al actualizar el producto', 'danger')

        return redirect(url_for('index'))

    # Realizar una solicitud GET para obtener los detalles del producto a actualizar
    response = requests.get(f'http://localhost:3000/api/productos/{productId}')
    if response.status_code == 200:
        producto = response.json()
    else:
        flash('Error al obtener el producto para actualizar', 'danger')
        return redirect(url_for('index'))

    return render_template('update_product.html', producto=producto)

# Ruta para eliminar un producto
@app.route('/api/productos/<string:productId>', methods=['POST'])
def delete_product(productId):
    response = requests.delete(f'http://localhost:3000/api/productos/{productId}')

    if response.status_code == 200:
        flash('Producto eliminado exitosamente', 'success')
    else:
        flash('Error al eliminar el producto', 'danger')

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
