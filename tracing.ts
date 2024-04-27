import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION,
  } from '@opentelemetry/semantic-conventions';
  import { Resource } from '@opentelemetry/resources';
  
const sdk = new NodeSDK({
    resource: new Resource({
        [SEMRESATTRS_SERVICE_NAME]: 'storefront',
        [SEMRESATTRS_SERVICE_VERSION]: '1.0',
      }),
    traceExporter: new OTLPTraceExporter({
        url: 'http://jaeger:4318/v1/traces' // Adjust this URL to your OpenTelemetry Collector endpoint
    }),
    instrumentations: [getNodeAutoInstrumentations()]
});

registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
});

sdk.start();

// Optionally export this if you need to shutdown the tracing manually
module.exports = sdk;