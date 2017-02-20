import logging
logging.basicConfig(level=logging.DEBUG)

from spyne import Application
from spyne.protocol.http import HttpRpc
from spyne.protocol.soap import Soap11
from spyne.server.twisted import TwistedWebResource
from twisted.internet import reactor
from twisted.web.server import Site

from MammothService import MammothService
application = Application([MammothService],
                          tns='MammothService',
                          in_protocol=Soap11(validator='lxml'),
                          out_protocol=Soap11()
                          )

if __name__ == '__main__':
    resource = TwistedWebResource(application)
    site = Site(resource)

    reactor.listenTCP(8003, site, interface='0.0.0.0')
    reactor.run()