import tensorflow as tf
from tensorflow.keras import layers, losses
from tensorflow.keras.models import Model
class Autoencoder(Model):
  def __init__(self):
    super(Autoencoder, self).__init__()
    self.encoder = tf.keras.Sequential([
        layers.Flatten(),
        layers.Dense(12, activation='tanh'),
        layers.Dense(13, activation='tanh'),
        layers.Dense(14, activation='tanh'),
        layers.Dense(15, activation='tanh'),
        layers.Dense(16, activation='tanh'),
    ])
    self.decoder = tf.keras.Sequential([
        layers.Dense(16, activation='tanh'),
        layers.Dense(15, activation='tanh'),
        layers.Dense(14, activation='tanh'),
        layers.Dense(13, activation='tanh'),
        layers.Dense(12, activation='tanh'),
    ])

  def call(self, x):
    encoded = self.encoder(x)
    decoded = self.decoder(encoded)
    return decoded

