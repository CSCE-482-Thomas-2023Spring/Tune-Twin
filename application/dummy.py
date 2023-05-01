import tensorflow as tf
from autoencoder import Autoencoder

# Load the original model
model = Autoencoder()
model.built = True
k = model.load_weights("model_weights/.index")
print(k)

# Set all the weights to 0
for layer in model.layers:
    for weight in layer.get_weights():
        weight.fill(0)

# Save the updated model
model.save('zeros_model.h5')